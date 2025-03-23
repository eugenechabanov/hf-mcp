import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';
import { makeHfRequest, HF_AUTH_ENDPOINT, HF_SCHEDULE_ENDPOINT } from './utils.js';

// Load environment variables
dotenv.config();

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
    // Use STDIO transport for local testing
    const transport = new StdioServerTransport();
    
    // Connect server to transport
    await server.connect(transport);
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

// Start the server
main(); 