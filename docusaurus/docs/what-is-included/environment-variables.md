---
id: environment-variables
title: Environment variables
sidebar_label: Environment variables
---

Next.js uses [`dotenv`](https://www.npmjs.com/package/dotenv) to load environment variables from the `.env` file. We already provide an `.env.sample` file, which you can clone to a `.env` file so you have a starting point with all the environment variables suitable for development.

In Next.js, you may inject configuration through environment variables inlined at build-time or through runtime configuration.

The following environment variables already come with the boilerplate:

| Identifier | Type | Description | Value |
|----------- | ---- | ----------- |-------|
| GTM_CONTAINER_ID | Build-time | [Google Tag Manager](https://tagmanager.google.com/) container ID that is used for [analytics](/docs/what-is-included/analytics) | `undefined` |
| SITE_URL | Build-time | Fully qualified URL where the application will be available at (without trailing slash) | `undefined` |

## Build-time environment variables

In general, [build-time configuration](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) via environment variables is preferable as they give us many benefits, such as serverless compatibility and dead-code elimination.

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

2. Add it to function exported by `next.config.js` file, using [`env-var`](https://github.com/evanshortiss/env-var) to validate and normalize values.

    ```js
    const FEATURE_A = envVar.get('FEATURE_A').default('false').asBool();

    // ...
    {
        env: {
            // ...
            FEATURE_A,
        },
    }
    ```

    If your environment variable is mandatory, please use `.required()` like `SITE_URL` is using.

3. Add it to the Dockerfile

    ```dockerfile
    # Define build arguments & map them to environment variables
    ARG FEATURE_A
    ENV FEATURE_A ${FEATURE_A}
    ```

## Runtime configuration

While build-time environments are preferable, there are some scenarios where they might pose a problem.
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

2. Add them to the function exported by `next.config.js` file, using [`env-var`](https://github.com/evanshortiss/env-var) to validate and normalize values:

    ```js
    const SOME_SERVICE_PUBLIC_KEY = envVar.get('SOME_SERVICE_PUBLIC_KEY')
        .required(isEnvRequired(phase))
        .asString();
    const SOME_SERVICE_PRIVATE_KEY = envVar.get('SOME_SERVICE_PRIVATE_KEY')
        .required(isEnvRequired(phase))
        .asString();

    // ...
    {
        publicRuntimeConfig: {
            // ...
            SOME_SERVICE_PUBLIC_KEY,
        },
        serverRuntimeConfig: {
            // ...
            SOME_SERVICE_PRIVATE_KEY,
        },
    }
    ```
