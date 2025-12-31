import "dotenv/config";
import { prismaClient } from "./index";
import bcrypt from "bcrypt";

async function main() {
    console.log("🌱 Starting database seed...");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🧹 Cleaning existing data...");
    await prismaClient.websiteTick.deleteMany();
    await prismaClient.website.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.region.deleteMany();

    // Create Regions
    console.log("📍 Creating regions...");
    const regions = await Promise.all([
        prismaClient.region.create({
            data: {
                region: "asia"
            }
        }),
        prismaClient.region.create({
            data: {
                region: "north-america"
            }
        }),
        prismaClient.region.create({
            data: {
                region: "australia"
            }
        }),
        prismaClient.region.create({
            data: {
                region: "europe"
            }
        })
    ]);
    console.log(`✅ Created ${regions.length} regions`);

    // Create Users
    console.log("👤 Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const users = await Promise.all([
        prismaClient.user.create({
            data: {
                username: "admin",
                password: hashedPassword,
                name: "Admin User"
            }
        }),
        prismaClient.user.create({
            data: {
                username: "john_doe",
                password: hashedPassword,
                name: "John Doe"
            }
        }),
        prismaClient.user.create({
            data: {
                username: "jane_smith",
                password: hashedPassword,
                name: "Jane Smith"
            }
        })
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create Websites
    console.log("🌐 Creating websites...");
    const websites = await Promise.all([
        // Admin's websites
        prismaClient.website.create({
            data: {
                url: "https://google.com",
                user_id: users[0].id
            }
        }),
        prismaClient.website.create({
            data: {
                url: "https://chetankumar.me",
                user_id: users[0].id
            }
        }),
        prismaClient.website.create({
            data: {
                url: "https://stackoverflow.com",
                user_id: users[0].id
            }
        }),
        // John's websites
        prismaClient.website.create({
            data: {
                url: "https://example.com",
                user_id: users[1].id
            }
        }),
        prismaClient.website.create({
            data: {
                url: "https://jsonplaceholder.typicode.com",
                user_id: users[1].id
            }
        }),
        // Jane's websites
        prismaClient.website.create({
            data: {
                url: "https://httpbin.org",
                user_id: users[2].id
            }
        })
    ]);
    console.log(`✅ Created ${websites.length} websites`);

    // Create Website Ticks (monitoring history)
    console.log("📊 Creating website ticks...");
    const ticks = [];
    
    for (const website of websites) {
        // Create a few ticks for each website from different regions
        for (const region of regions) {
            // Add some historical ticks
            ticks.push(
                prismaClient.websiteTick.create({
                    data: {
                        website_id: website.id,
                        region_id: region.id,
                        status: Math.random() > 0.1 ? "up" : "down", // 90% up, 10% down
                        responseTime_ms: Math.floor(Math.random() * 500) + 50 // 50-550ms
                    }
                })
            );
        }
    }
    
    await Promise.all(ticks);
    console.log(`✅ Created ${ticks.length} website ticks`);

    console.log("\n✨ Seed completed successfully!");
    console.log("\n📝 Summary:");
    console.log(`   - ${regions.length} regions`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${websites.length} websites`);
    console.log(`   - ${ticks.length} website ticks`);
    console.log("\n🔑 Default password for all users: password123");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prismaClient.$disconnect();
    });

