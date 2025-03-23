FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript code
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "build/index.js"] 