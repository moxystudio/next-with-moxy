---
id: recipe-rest-api
title: Adding a simple REST API
sidebar_label: Adding a simple REST API
---

Sometimes a project may require a simple REST API (e.g. to send an email). Next.js brought API routes support in v9, but you have to provide your own implementation for handling different HTTP methods, validation, error handling and so on. We have created [`@moxy/next-rest-api`](https://github.com/moxystudio/next-rest-api/) to solve these problems, so that you can focus on writing your business logic.

> ℹ️ Besides getting familiar with the `next-rest-api`, you might want to give a quick read over Next.js [API routes](https://nextjs.org/docs#api-routes) documentation. Next.js extend Node.js `req` and `res` objects with additional functionality and ship with built-in middleware.

> ⚠️ Please note that if you require more than a simple API with one or two endpoints, it's better if you create a separate project (and repository) for it.

## Walk-through

### 1. Install `@moxy/next-rest-api`

```bash
npm i @moxy/next-rest-api @hapi/joi @hapi/boom
```

### 1. Create `api/my-endpoint.js` file

```js
import withRest from '@moxy/next-rest-api';

export default withRest({
    GET: async (req, res) => {
        // Do something..

        return { hello: 'world' };
    },
});
```

### 2. Map `api/my-endpoint.js` to `pages/api/my-endpoint.js`

Next.js requires pages to be defined in `pages/` so we must create `pages/api/my-endpoint.js`:

```js
export { default } from '../../api/my-endpoint';
```

### 3. Access your API at `/api/my-endpoint`

Next.js will map every file in `api/` to a corresponding `/api/...` route. For example, the file `api/products.js` will map to the `/api/products` endpoint.
