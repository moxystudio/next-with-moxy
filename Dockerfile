# Use latest stable version of node (12 at the moment)
FROM node:12-alpine

# Define environment variables
ENV PORT 3000
ENV HOST 0.0.0.0

# Define project dir
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build project
RUN npm run build

# Expose port and start command
EXPOSE $PORT
CMD [ "npm", "start" ]
