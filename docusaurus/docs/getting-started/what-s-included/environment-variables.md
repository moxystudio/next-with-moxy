---
id: environment-variables
title: Environment Variables
sidebar_label: Environment Variables
---

This boilerplate is setup such that environment variables are passed at buildtime.
You can access these variables from `process.env`, but all variables must be defined before they can be used.

First, you have to define them in your `.env` file.
We already provide an `.env.sample` file, which you can clone to a `.env` file so you have a starting point with all the environment variables.

The following example is defining the `GA_TRACKING_ID` variable:

```bash
# Google Analytics Tracking Code
GA_TRACKING_ID=12345
```

If you want to add a environment variable, you must define them in the same way:

```bash
# Google Analytics Tracking Code
GA_TRACKING_ID=12345

# Some Other Env Variable
ENV_VAR="var content"
```

In the `next.config.js` file, you can define these variables at the very end where you can find the following code:

```js
{
    env: {
        GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    },
}
```

As you can see, we already have `GA_TRACKING_ID` setup as an environment variable, that will be accessible everywhere else through  `process.env.GA_TRACKING_ID`.
If you want to add more variables, they must go through this step.
The following example adds the previously created `ENV_VAR`.

```js
{
    env: {
        GA_TRACKING_ID: process.env.GA_TRACKING_ID,
        ENV_VAR: process.env.ENV_VAR
    },
}
```

These are the environment variables the boilerplate already comes with:

| Identifier | Description | Value |
|----------------|---------------------------------------------------------------|-------------|
| GA_TRACKING_ID | Google Analytics Tracking ID that is used to track page views | `undefined` |
