#!/bin/bash

echo "Testing MCP server locally with Smithery CLI..."

# First, build the TypeScript project
echo "Building TypeScript files..."
npm run build

# Install Smithery CLI if needed
if ! command -v smithery &> /dev/null; then
  echo "Installing Smithery CLI..."
  npm install -g @smithery/cli
fi

# Start the server with Smithery CLI for local testing
echo "Starting Smithery CLI..."
smithery dev --config smithery-local.yaml 