# Use the official Node.js image as the base image
FROM node:20.18.0-alpine3.19

# Install PM2 globally
RUN npm install -g pm2

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the application (if applicable)
# RUN npm run build  (Uncomment if there's a build step)

# Expose the port that the application will run on
EXPOSE 3000

# Use PM2 to run the application
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
