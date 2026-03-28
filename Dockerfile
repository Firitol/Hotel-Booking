# Use Node
FROM node:18-alpine

# Enable pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy EVERYTHING (important)
COPY . .

# Install dependencies (workspace-aware)
RUN pnpm install --frozen-lockfile

# Move to backend
WORKDIR /app/backend

# Expose port
EXPOSE 3000

# Start backend
CMD ["pnpm", "start"]
