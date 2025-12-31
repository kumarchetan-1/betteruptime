import { xAckBulk, xReadGroup } from "../../packages/redisstream";
import axios from "axios";
import { prismaClient } from "db/client";

const regionName = process.env.REGION_NAME!;
const workerId   = process.env.WORKER_ID!;

// Cache the region ID to avoid querying every time
let regionId: string | null = null;

// Helper function to get or find region ID
async function getRegionId(): Promise<string> {
  // If we already have it cached, return it
  if (regionId) {
    return regionId;
  }

  // Find the region by name
  const region = await prismaClient.region.findFirst({
    where: {
      region: regionName
    }
  });

  if (!region) {
    throw new Error(`Region "${regionName}" not found in database. Please run the seed script first.`);
  }

  // Cache it for future use
  regionId = region.id;
  return regionId;
}

async function main() {
  
  while (true) {
    const res = await xReadGroup(regionName, workerId);

    if (!res?.length) {
      // Wait 2 seconds before checking again to avoid spamming console
      await new Promise(resolve => setTimeout(resolve, 2000));
      continue;
    }

    await Promise.all(
      res.map(({ message }) =>
        fetchWebsite(message.id!, message.url!)
      )
    );

    await xAckBulk(regionName, res.map(({ id }) => id))
  }
}

async function fetchWebsite(websiteId: string, url: string) {
  const start = Date.now();

  // First, verify the website exists in the database
  const website = await prismaClient.website.findUnique({
    where: { id: websiteId }
  });

  if (!website) {
    console.error(`Website with ID ${websiteId} not found in database. Skipping.`);
    return;
  }

  // Ensure URL has a protocol (http:// or https://)
  let fullUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    fullUrl = `https://${url}`;
  }

  try {
    await axios.get(fullUrl, {
      timeout: 10000, // 10 second timeout
    });
    await saveTick(websiteId, "up", start);
  } catch {
    await saveTick(websiteId, "down", start);
  }
}

async function saveTick(websiteId: string, status: "up" | "down" | "unknown", start: number) {
  try {
    // Get the region ID (UUID) from the region name
    const regionIdValue = await getRegionId();
    
    await prismaClient.websiteTick.create({
      data: {
        website_id: websiteId,
        region_id: regionIdValue, // Use the UUID, not the name
        status,
        responseTime_ms: Date.now() - start,
      },
    });
  } catch (error: any) {
    // Handle foreign key constraint errors gracefully
    if (error.code === "P2003") {
      console.error(`Failed to save tick: Foreign key constraint violation for website ${websiteId}`);
    } else {
      console.error(`Failed to save tick for website ${websiteId}:`, error.message);
    }
  }
}

main();