@echo off
cd %~dp0
echo Building TypeScript files...
call npm run build
echo Stopping any existing Node.js processes...
taskkill /F /IM node.exe 2>nul

echo Starting MCP Inspector with our server...
start "" http://localhost:5173
npx --no -- @modelcontextprotocol/inspector node build/server.js

rem This is the correct way to use MCP Inspector - it acts as both the server runner and UI 