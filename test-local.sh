#!/bin/bash

echo "Testing MCP server locally with MCP Inspector..."

# First, build the TypeScript project
echo "Building TypeScript files..."
npm run build

# Install MCP Inspector if needed
if ! command -v mcp-inspector &> /dev/null; then
  echo "Installing MCP Inspector..."
  npm install @modelcontextprotocol/inspector -g
fi

# Start the server with MCP Inspector
echo "Starting MCP Inspector..."
mcp-inspector node build/local.js 