# Just Built My First Distributed System! 🎉

Hey everyone! So I just finished building a website monitoring system using Redis Streams and I'm super excited to share what I learned! 😊

## The Big Picture

Basically, I made a system that checks if websites are up or down, and it can handle tons of websites at the same time. Here's how it works:

**Producer → Redis Stream → Workers**

## What I Learned:

**1. Producer** 📤
- Grabs all websites from my database every 3 minutes
- Sends them to a Redis Stream (like a to-do list)
- Super simple but super important!

**2. Redis Streams** 🌊
- Think of it like a never-ending list where you can add stuff
- Messages stay there even if workers crash (which is awesome!)
- Each message gets a unique ID automatically

**3. Consumer Groups** 👥
- This is the cool part! Multiple workers can read from the same stream
- Each message goes to only ONE worker (no duplicates!)
- If one worker dies, others pick up the slack
- Want more speed? Just add more workers!

**4. Workers** ⚙️
- They grab messages from the stream
- Check if websites are up or down
- Save results to the database
- Say "done!" (ACK) when finished

**5. ACK (Acknowledgment)** ✅
- Workers say "I'm done!" after processing
- If they crash, the message gets sent to another worker
- No data loss! 🎯

## Why This is Cool:

✨ You can add more workers anytime without changing code
✨ If something breaks, nothing gets lost
✨ Super fast because everything runs in parallel
✨ Works from different places (like India, US, etc.)

## Tech I Used:

- Redis Streams (the message queue)
- PostgreSQL (where I store everything)
- TypeScript (because types are awesome)
- Bun (super fast runtime)

This was honestly one of the coolest projects I've worked on! Learning about distributed systems and message queues has been mind-blowing. If you're into backend stuff, definitely check out Redis Streams! 🚀

#Redis #Coding #Learning #BackendDevelopment #StudentLife #Tech #Programming

