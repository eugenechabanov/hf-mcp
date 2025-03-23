#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build TypeScript files
echo "Building TypeScript files..."
npm run build

# Start the server
echo "Starting server..."
node build/index.js 