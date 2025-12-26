import axios from "axios";
import { BACKEND_URL } from "./utils";


// Helper function to get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// Helper function to create axios instance with auth header
function createApiClient() {
  const token = getAuthToken();
  
  return axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

// API functions

/**
 * Get all websites for the current user
 */
export async function getWebsites() {
  const client = createApiClient();
  const response = await client.get("/api/v1/websites");
  return response.data.websites; // Returns array of websites
}

/**
 * Add a new website
 */
export async function addWebsite(url: string) {
  const client = createApiClient();
  const response = await client.post("/api/v1/website", { url });
  return response.data; // Returns { id: string }
}

/**
 * Get website status with latest tick information
 */
export async function getWebsiteStatus(websiteId: string) {
  const client = createApiClient();
  const response = await client.get(`/api/v1/website/status/${websiteId}`);
  return response.data.website; // Returns website with ticks array
}

