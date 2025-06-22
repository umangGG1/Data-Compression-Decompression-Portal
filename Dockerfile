# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy backend package files and install
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy frontend package files and install
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Go back to app root and copy all source code
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Go back to app root
WORKDIR /app

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"] 