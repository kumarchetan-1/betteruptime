import { prismaClient } from "db/client";
import { bulkXadd } from "../../packages/redisstream";



async function main() {
    const websites: { url: string, id: string }[] = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true
        }
    })
    console.log(websites);
    
    const res = await bulkXadd(websites)
    console.log(res)
}

setInterval(main, 3 * 60 * 1000)

main()