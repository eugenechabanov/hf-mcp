import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { makeHfRequest, HF_AUTH_ENDPOINT, HF_SCHEDULE_ENDPOINT } from './utils.js';

const server = new McpServer({
  name: "Hypefury MCP",
  version: "1.0.0",
});


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

server.tool(
  "schedule_post",
  "Schedule a post to be published via Hypefury",
  {
    message: z.string().describe("The message content to post")
  },
  async ({ message }: { message: string }) => {
    const postData = {
      text: message
    };

    const response = await makeHfRequest(HF_SCHEDULE_ENDPOINT, JSON.stringify(postData));
    
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
          text: "Post scheduled successfully."
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();

server.connect(transport); 