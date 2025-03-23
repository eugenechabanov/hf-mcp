@echo off
echo Testing MCP server locally with Smithery CLI...

:: First, build the TypeScript project
echo Building TypeScript files...
call npm run build

:: Install Smithery CLI if needed
if not exist "node_modules\.bin\smithery.cmd" (
  echo Installing Smithery CLI...
  call npm install -g @smithery/cli
)

:: Start the server with Smithery CLI for local testing
echo Starting Smithery CLI...
smithery dev --config smithery-local.yaml 