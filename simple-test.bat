@echo off
echo Building TypeScript files...
call npm run build

echo.
echo IMPORTANT: Testing with MCP Inspector in a new window
echo The MCP Inspector window will open shortly...
echo Browse to http://localhost:5173 to view the UI
echo.
echo Wait for the MCP Inspector window to start before continuing.
echo.
pause

:: Start the MCP Inspector in a separate window
start "MCP Inspector" powershell -Command "npx @modelcontextprotocol/inspector node build/simpleTest.js" 