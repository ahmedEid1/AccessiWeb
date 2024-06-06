# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple web server to serve the build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]
