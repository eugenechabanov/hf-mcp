import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Very simple MCP server just for testing
const server = new McpServer({
  name: "Hypefury MCP Test",
  version: "1.0.0",
});

// Add a simple test tool
server.tool(
  "test",
  "Simple test tool",
  {
    message: z.string().optional().describe("Optional message")
  },
  async ({ message }: { message?: string }) => {
    console.error(`Test tool called with message: ${message || "none"}`); // Will appear in the console
    
    return {
      content: [
        {
          type: "text",
          text: `Test successful! Message: ${message || "none"}`
        }
      ]
    };
  }
);

// Add the auth tool
server.tool(
  "auth",
  "Authenticate with Hypefury",
  {},
  async () => {
    console.error("Auth tool called"); // Will appear in the console
    
    return {
      content: [
        {
          type: "text",
          text: "Authentication successful (test)"
        }
      ]
    };
  }
);

// Add the schedule_post tool
server.tool(
  "schedule_post",
  "Schedule a post to be published via Hypefury",
  {
    message: z.string().describe("The message content to post")
  },
  async ({ message }: { message: string }) => {
    console.error(`Schedule post tool called with message: ${message}`); // Will appear in the console
    
    return {
      content: [
        {
          type: "text",
          text: `Post scheduled successfully: "${message}" (test)`
        }
      ]
    };
  }
);

// Start the server with stdio transport
const transport = new StdioServerTransport();

async function start() {
  try {
    // Connect to the transport
    console.error("Starting MCP server with stdio transport...");
    await server.connect(transport);
    console.error("MCP server started successfully!");
  } catch (error) {
    console.error("Error starting MCP server:", error);
  }
}

start(); 