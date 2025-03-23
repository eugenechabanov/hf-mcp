@echo off
echo Testing MCP server locally with MCP Inspector...

:: First, build the TypeScript project
echo Building TypeScript files...
call npm run build

:: Install MCP Inspector if needed
if not exist "node_modules\.bin\mcp-inspector.cmd" (
  echo Installing MCP Inspector...
  call npm install @modelcontextprotocol/inspector -g
)

:: Start the server with MCP Inspector
echo Starting MCP Inspector...
mcp-inspector node build/local.js 