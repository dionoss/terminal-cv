# Use Node.js LTS base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Enable pnpm and install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# Build the app
RUN pnpm build

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["pnpm", "start"]
