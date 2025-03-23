@echo off
echo Building TypeScript files...
call npm run build

echo Starting MCP Inspector with our server in a background window...
start "MCP Inspector" powershell -Command "npx @modelcontextprotocol/inspector node build/server.js"

echo Waiting for server to start...
timeout /t 5

echo.
echo MCP Inspector is running in a separate window
echo.
echo Test the tools with these commands:
echo.
echo curl.exe -X POST http://localhost:3000/jsonrpc -H "Content-Type: application/json" -d "{\"jsonrpc\":\"2.0\",\"id\":\"1\",\"method\":\"mcp.listTools\",\"params\":{}}"
echo.
echo curl.exe -X POST http://localhost:3000/jsonrpc -H "Content-Type: application/json" -d "{\"jsonrpc\":\"2.0\",\"id\":\"2\",\"method\":\"auth\",\"params\":{}}"
echo.
echo curl.exe -X POST http://localhost:3000/jsonrpc -H "Content-Type: application/json" -d "{\"jsonrpc\":\"2.0\",\"id\":\"3\",\"method\":\"schedule_post\",\"params\":{\"message\":\"Test post\"}}"
echo.
echo You can also browse to the MCP Inspector UI at: http://localhost:5173 