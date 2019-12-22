# Use latest stable version of node (12 at the moment)
FROM node:12-alpine

# Define build args
ARG GA_TRACKING_ID

# Define environment variables
ENV PORT 3000
ENV GA_TRACKING_ID $GA_TRACKING_ID

# Define project dir
WORKDIR /usr/src/app

# Install OS deps necessary by some packages (e.g.: node-canvas)
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build project
RUN npm run build

# Expose port and start command
EXPOSE $PORT
CMD npm start -- -p $PORT
