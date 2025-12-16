import "dotenv/config";
import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from '@prisma/adapter-pg';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set. Please set it in your .env file.");
}

const connectionString = process.env.DATABASE_URL;

// Validate that the connection string is a string and not empty
if (typeof connectionString !== 'string' || connectionString.trim() === '') {
  throw new Error("DATABASE_URL must be a non-empty string. Current value: " + typeof connectionString);
}

const adapter = new PrismaPg({
  connectionString: connectionString,
});

export const prismaClient = new PrismaClient({ adapter });
