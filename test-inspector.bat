@echo off
echo Building TypeScript files...
call npm run build

echo Starting MCP Inspector with our server...
npx @modelcontextprotocol/inspector node build/server.js

rem This is the correct way to use MCP Inspector - it acts as both the server runner and UI 