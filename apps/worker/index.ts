import { xAckBulk, xReadGroup } from "../../packages/redisstream";
import axios from "axios";
import { prismaClient } from "db/client";

const regionName = process.env.REGION_NAME!;
const workerId   = process.env.WORKER_ID!;

async function main() {
  while (true) {
    const res = await xReadGroup(regionName, workerId);

    if (!res?.length) {
      console.log("No website");
      continue;
    }

    await Promise.all(
      res.map(({ message }) =>
        fetchWebsite(message.id!, message.url!)
      )
    );

    const resAck = await xAckBulk(regionName, res.map(({ id }) => id))
    console.log(resAck);
  }
}

async function fetchWebsite(websiteId: string, url: string) {
  const start = Date.now();

  try {
    await axios.get(url);
    await saveTick(websiteId, "up", start);
  } catch {
    await saveTick(websiteId, "down", start);
  }
}

async function saveTick(websiteId: string, status: "up" | "down" | "unknown", start: number) {
  await prismaClient.websiteTick.create({
    data: {
      website_id: websiteId,
      region_id: regionName,
      status,
      responseTime_ms: Date.now() - start,
    },
  });
}

main();