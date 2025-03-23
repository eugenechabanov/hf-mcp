# Hypefury MCP Server

This project is a Model Context Protocol (MCP) server for integrating with Hypefury, a social media scheduling and growth platform. The server provides tools for authenticating with Hypefury and scheduling posts.

## Features

- Authentication with Hypefury API
- Scheduling posts on social media via Hypefury
- Deployment-ready for Smithery.ai
- Local testing capability

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/eugenechabanov/hf-mcp.git
cd hf-mcp

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
HF_API_KEY=your_hypefury_api_key
```

Alternatively, when deploying to Smithery, set these as environment secrets.

## Local Testing

Test the MCP server locally with:

```bash
# Build and start with local testing transport
npm run dev:local
```

Or test with MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node build/local.js
```

Then open http://localhost:5173 in your browser to interact with the MCP server.

## Deployment to Smithery

1. Push this repository to GitHub
2. Create a new server on Smithery.ai
3. Connect to this repository
4. Set `HF_API_KEY` as a secret
5. Deploy

## Tools

This MCP server provides the following tools:

1. `auth` - Authenticate with Hypefury
2. `schedule_post` - Schedule a post to be published via Hypefury

## License

MIT 