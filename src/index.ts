import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import dotenv from 'dotenv';
import { WebSocketServerTransport } from './websocket.js';
import { makeHfRequest, HF_AUTH_ENDPOINT, HF_SCHEDULE_ENDPOINT } from './utils.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Create the MCP server
const server = new McpServer({
  name: "Hypefury MCP",
  version: "1.0.0",
});

// Authentication tool
server.tool(
  "auth",
  "Authenticate with Hypefury",
  {},
  async () => {
    const response = await makeHfRequest(HF_AUTH_ENDPOINT);
    
    if (!response) {
      return {
        content: [
          {
            type: "text",
            text: "Unable to authenticate with Hypefury."
          }
        ]
      };
    }
    
    if (response.statusCode === 409) {
      return {
        content: [
          {
            type: "text",
            text: "Already authenticated with Hypefury."
          }
        ]
      };
    } else if (response.statusCode === 403) {
      return {
        content: [
          {
            type: "text",
            text: "Invalid API key."
          }
        ]
      };
    } else if (response.statusCode === 200) {
      return {
        content: [
          {
            type: "text",
            text: "Successfully authenticated with Hypefury. You can now schedule posts."
          }
        ]
      };
    }
    
    return {
      content: [
        {
          type: "text",
          text: `Unexpected response: ${response.statusCode || 'unknown'}`
        }
      ]
    };
  }
);

// Post scheduling tool
server.tool(
  "schedule_post",
  "Schedule a post to be published via Hypefury",
  {
    message: z.string().describe("The message content to post")
  },
  async ({ message }: { message: string }) => {
    const data = JSON.stringify({
      text: message,
    });

    const response = await makeHfRequest(HF_SCHEDULE_ENDPOINT, data);
    
    if (!response) {
      return {
        content: [
          {
            type: "text",
            text: "Unable to schedule post."
          }
        ]
      };
    }
    
    return {
      content: [
        {
          type: "text",
          text: "Post scheduled successfully.",
        }
      ]
    };
  }
);

// Main function to start the server
async function main() {
  try {
    console.log(`Starting Hypefury MCP Server on port ${PORT}`);
    
    // Create WebSocket transport
    const transport = new WebSocketServerTransport(PORT);
    
    // Start transport and connect server to it
    await transport.start();
    await server.connect(transport);
    
    console.log(`Hypefury MCP Server is running on port ${PORT}`);
    
    // Keep the server running
    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      await transport.close();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('Shutting down server...');
      await transport.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

// Start the server
main(); 