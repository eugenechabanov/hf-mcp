import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { makeHfRequest, HF_AUTH_ENDPOINT, HF_SCHEDULE_ENDPOINT } from './utils.js';

console.log("Starting Hypefury MCP Server...");

// Create a server instance
const server = new McpServer({
  name: "Hypefury MCP",
  version: "1.0.0",
});

// Add the auth tool
console.log("Registering auth tool...");
server.tool(
  "auth",
  "Authenticate with Hypefury",
  {},
  async () => {
    console.log("Auth tool called");
    // Simulate successful auth without making actual API call
    return {
      content: [
        {
          type: "text",
          text: "Authentication successful (simulated)"
        }
      ]
    };
  }
);

// Add the schedule_post tool
console.log("Registering schedule_post tool...");
server.tool(
  "schedule_post",
  "Schedule a post to be published via Hypefury",
  {
    message: z.string().describe("The message content to post")
  },
  async ({ message }: { message: string }) => {
    console.log(`Schedule post tool called with message: ${message}`);
    // Simulate successful post scheduling without making actual API call
    return {
      content: [
        {
          type: "text",
          text: `Post scheduled successfully: "${message}" (simulated)`
        }
      ]
    };
  }
);

// Start the server with stdio transport for MCP Inspector
const transport = new StdioServerTransport();

// Connect the server to the transport
server.connect(transport);

console.log("Hypefury MCP Server started with stdio transport");
console.log("You can connect to it using the MCP Inspector at http://localhost:5173"); 