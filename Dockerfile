# Use Node.js 22 as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the application inside the container
EXPOSE 3000

# Start the Next.js app on port 3000 inside the container
CMD ["npm", "run", "start"]
