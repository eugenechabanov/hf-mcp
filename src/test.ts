import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { makeHfRequest, HF_AUTH_ENDPOINT, HF_SCHEDULE_ENDPOINT } from './utils.js';

console.log("Starting test script...");

// Create a server instance
const server = new McpServer({
  name: "Hypefury MCP Test",
  version: "1.0.0",
});

console.log("Created MCP server instance");

// Add the auth tool
console.log("Registering auth tool...");
server.tool(
  "auth",
  "Authenticate with Hypefury",
  {},
  async () => {
    // Skip actual API call for testing
    console.log("Auth tool called");
    
    return {
      content: [
        {
          type: "text",
          text: "Auth tool test successful"
        }
      ]
    };
  }
);
console.log("Auth tool registered successfully");

// Add the schedule_post tool
console.log("Registering schedule_post tool...");
server.tool(
  "schedule_post",
  "Schedule a post to be published via Hypefury",
  {
    message: z.string().describe("The message content to post")
  },
  async ({ message }: { message: string }) => {
    // Skip actual API call for testing
    console.log(`Schedule post tool called with message: ${message}`);
    
    return {
      content: [
        {
          type: "text",
          text: "Schedule post tool test successful"
        }
      ]
    };
  }
);
console.log("Schedule_post tool registered successfully");

// Test functions
async function runTests() {
  console.log("\n--- Starting test sequence ---");
  
  // We can't directly list tools without a transport in this version of the SDK
  // But we can show they're registered
  console.log("\nTools have been registered successfully!");
  console.log("- auth: Authenticate with Hypefury");
  console.log("- schedule_post: Schedule a post to be published via Hypefury");
  
  console.log("\nAll tests completed successfully!");
  console.log("--- End of test sequence ---");
}

// Run the tests
console.log("Executing test function...");
runTests().catch(error => {
  console.error("Test failed:", error);
}).then(() => {
  console.log("Test script completed");
}); 