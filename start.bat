@echo off
echo Checking dependencies...

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

echo Building TypeScript files...
call npm run build

echo Starting server...
node build/index.js 