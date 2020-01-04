---
id: environment-variables
title: Environment Variables
sidebar_label: Environment Variables
---

This boilerplate is setup to use [`dotenv`](https://www.npmjs.com/package/dotenv) to facilitate loading environment variables from the `.env` file. We already provide an `.env.sample` file, which you can clone to a `.env` file so you have a starting point with all the environment variables suitable for development.

In Next.js, you may inject configuration through environment variables inlined at build-time or through runtime configuration.

The following environment variables already come with the boilerplate:

| Identifier | Type | Description | Value |
|----------- | ---- | ----------- |-------|
| GA_TRACKING_ID | Build-time | Google Analytics Tracking ID that is used to track page views | `undefined` |

## Build-time environment variables

In general, [build-time configuration](#build-time-configuration) via environment variables is preferable as they give us many benefits, such as serverless compatibility and dead-code elimination.

You can access these variables from `process.env`:

```js
if (process.env.FEATURE_A) {
    // Do something..
}
```

### Adding a new environment variable

1. Define the environment variable in `.env` and `.env.sample`:

    ```bash
    # ...

    # Enables feature "A"
    FEATURE_A=1
    ```

    You should provide a good default value for development in the `.env.sample`, if applicable.

2. Add it to the `env` key at the very end of the `next.config.js` file:

    ```js
    {
        env: {
            // ...
            FEATURE_A: process.env.FEATURE_A
        },
    }
    ```

3. Add it to the Dockerfile

    ```dockerfile
    # Define build args
    # ...
    ARG FEATURE_A

    # Define environment variables
    # ...
    ENV FEATURE_A ${FEATURE_A}
    ```

## Runtime configuration

While build-time environments are prefereable, there are some scenarios where they might pose a problem.
One scenario is when it's impossible or unfesable to having to rebuild the project when configuration changes. If that's the case, you may use [runtime configuration](https://nextjs.org/docs#runtime-configuration) instead.

> ⚠️ Be aware that runtime configuration will make your project incompatible with serverless deployments and static optimization.

You can access runtime configuration by using `next/config`:

```js
import { getConfig } from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// Config below will be available only on the server side
console.log(serverRuntimeConfig.SOME_SERVICE_PRIVATE_KEY);
// Config below will be available on both server and client
console.log(publicRuntimeConfig.SOME_SERVICE_PUBLIC_KEY);
```

### Adding a new runtime config

1. Define the environment variable in `.env` and `.env.sample`:

```bash
# ...

# Some necessary keys to interact with a third-party service
SOME_SERVICE_PUBLIC_KEY=
SOME_SERVICE_PRIVATE_KEY=
```

You should provide a good default value for development in the `.env.sample`, if applicable.

2. Add it to the `env` key at the very end of the `next.config.js` file:

```js
{
    publicRuntimeConfig: {
        // ...
        SOME_SERVICE_PUBLIC_KEY: process.env.SOME_SERVICE_PUBLIC_KEY
    },
    serverRuntimeConfig: {
        // ...
        SOME_SERVICE_PRIVATE_KEY: process.env.SOME_SERVICE_PRIVATE_KEY
    },
}
```
