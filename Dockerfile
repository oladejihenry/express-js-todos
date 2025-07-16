FROM node:22-alpine

# Install dependencies needed for Prisma and development
RUN apk add --no-cache \
    openssl \
    libc6-compat \
    python3 \
    make \
    g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "npm start"]