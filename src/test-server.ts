import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create a server instance with no console output
const server = new McpServer({
  name: "Minimal MCP Test",
  version: "1.0.0",
});

// Add a simple test tool
server.tool(
  "test",
  "Test if the server is working",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "The server is working!"
        }
      ]
    };
  }
);

// Add a simple echo tool
server.tool(
  "echo",
  "Echo a message back",
  {
    message: z.string().describe("The message to echo")
  },
  async ({ message }: { message: string }) => {
    return {
      content: [
        {
          type: "text",
          text: `You said: ${message}`
        }
      ]
    };
  }
);

// Start the server with StdioServerTransport for MCP Inspector
const transport = new StdioServerTransport();
server.connect(transport); 