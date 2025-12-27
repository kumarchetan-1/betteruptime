import { createClient } from "redis";

// Initialize Redis client
const client = await createClient()
    .on("error", (error) => console.log(error))
    .connect()

// Type definitions
type WebsiteEvent = {
    url: string
    id: string
}

type StreamMessage = {
    id: string
    message: Record<string, string>
}

type StreamEntry = {
    name: string
    messages: StreamMessage[]
}

const streamName = "betteruptime:website"

// Add a single website event to the Redis stream
async function xAdd({ id, url }: WebsiteEvent): Promise<string> {
    const messageId = await client.xAdd(
        streamName,
        "*", // Auto-generate message ID
        {
            url,
            id
        }
    )
    return messageId
}

// Add multiple website events to the Redis stream
export async function bulkXadd(websites: WebsiteEvent[]): Promise<void> {
    for (const website of websites) {
        const messageId = await xAdd({
            url: website.url,
            id: website.id
        })
        console.log("Added website to stream:", messageId)
    }
}

// Cache to track which consumer groups we've already checked/created
const consumerGroupCache = new Set<string>();

// Check if a consumer group exists
async function consumerGroupExists(consumerGroup: string): Promise<boolean> {
    try {
        const groups = await client.xInfoGroups(streamName)
        return groups.some((group: any) => group.name === consumerGroup)
    } catch (error) {
        return false
    }
}

// Create a consumer group if it doesn't exist (only checks once per group)
async function createConsumerGroup(consumerGroup: string): Promise<void> {
    // If we've already checked this group, skip
    if (consumerGroupCache.has(consumerGroup)) {
        return
    }

    // Check if group already exists
    const exists = await consumerGroupExists(consumerGroup)
    if (exists) {
        consumerGroupCache.add(consumerGroup)
        console.log(`Consumer group "${consumerGroup}" already exists`)
        return
    }

    // Create the group if it doesn't exist
    try {
        await client.xGroupCreate(streamName, consumerGroup, '$', {
            MKSTREAM: true // Create stream if it doesn't exist
        })
        consumerGroupCache.add(consumerGroup)
        console.log(`Consumer group "${consumerGroup}" created`)
    } catch (error) {
        console.error(`Failed to create consumer group "${consumerGroup}":`, error)
        throw error
    }
}

// Read messages from redis stream by workers or consumer group
export async function xReadGroup(
    consumerGroup: string,
    workerId: string
): Promise<StreamMessage[] | null> {
    await createConsumerGroup(consumerGroup)

    try {
        const result = await client.XREADGROUP(
            consumerGroup,
            workerId,
            {
                id: ">", // Read new messages
                key: streamName
            },
            {
                COUNT: 5 // Read up to 5 messages
            }
        )

        if (!result || !Array.isArray(result) || result.length === 0) {
            return null
        }

        const streamEntry = result[0] as StreamEntry | null

        if (streamEntry && streamEntry.messages) {
            console.log(`Found ${streamEntry.messages.length} messages`, streamEntry.messages)
            return streamEntry.messages
        }

        return null
    } catch (error) {
        console.error("Error reading from stream:", error)
        return null
    }
}

// Acknowledge that a message has been processed
 async function xAck(
    consumerGroup: string,
    eventId: string
): Promise<number> {
    const acknowledgedCount = await client.xAck(
        streamName,
        consumerGroup,
        eventId
    )
    
    console.log(`Acknowledged ${acknowledgedCount} message(s)`)
    return acknowledgedCount
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
    eventIds.map(async(eventId)=> await xAck(consumerGroup, eventId))
}