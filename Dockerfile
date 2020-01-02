# Dockerfile that produce Lightweight runtime images
# Inspired by https://github.com/zeit/next.js/issues/121#issuecomment-541399420

# -- BASE STAGE --------------------------------

FROM node:12-alpine AS base

# Install OS libs necessary by some packages during `npm i` (e.g.: node-canvas)
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

WORKDIR /src

COPY package*.json ./
RUN npm ci --no-audit

# -- CHECK STAGE --------------------------------

FROM base AS check

ARG CI
ENV CI $CI

COPY . .
RUN npm run lint
RUN npm test

# -- BUILD STAGE --------------------------------

FROM base AS build

# Define build arguments & map them to environment variables
ARG GA_TRACKING_ID
ENV GA_TRACKING_ID $GA_TRACKING_ID

# Build the project and then dispose files not necessary to run the project
# This will make the runtime image as small as possible
COPY . .
RUN npx next telemetry disable > /dev/null
RUN npm run build
RUN npm prune --production --no-audit
RUN rm -rf .next/cache

# -- RUNTIME STAGE --------------------------------

FROM node:12-alpine AS runtime

WORKDIR /usr/app

COPY --from=build /src/package.json /usr/app/package.json
COPY --from=build /src/node_modules /usr/app/node_modules
COPY --from=build /src/.next /usr/app/.next

ENV PORT 3000
EXPOSE $PORT
CMD npm start -- -p $PORT
