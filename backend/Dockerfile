# Use a slim Node.js base image
FROM node:20-slim

# Install Chromium and the necessary system libraries that Puppeteer needs
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    && rm -rf /var/lib/apt/lists/*

# Point Puppeteer to the system-installed Chromium and skip downloading its own
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy all backend source files into the container
COPY . .

# Expose the port (Render will route traffic here)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
