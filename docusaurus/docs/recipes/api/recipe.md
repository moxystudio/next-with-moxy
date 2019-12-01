---
id: recipe-api
title: Adding a simple API
sidebar_label: Adding a simple API
---

Sometimes a project may require a simple API (e.g. to send an email). Next.js comes with the ability to create API endpoints, which makes this recipe very straightforward. Please read their [API routes](https://nextjs.org/docs#api-routes) documentation as they extend Node.js `req` and `res` objects with additional functionality and ship with built-in middleware.

⚠️ Please note that if you require more than a simple API with one or two endpoints, it's better if you create a separate project (and repository) for it.

## Walk-through

### 1. Create `api/my-endpoint.js` file

```js
export default (req, res) => {
    res.status(200).json({ hello: 'world' });
};
```

### 2. Map `api/my-endpoint.js` to `pages/api/my-endpoint.js`

Next.js requires pages to be defined in `pages/` so we must create `pages/api/my-endpoint.js`:

```js
export { default } from '../../api/my-endpoint';
```

## Micro

If the built-in extended `req` and `res` objects and middleware are not sufficient to the needs of your API endpoints, you may use [micro](https://github.com/zeit/micro). It's fast, lightweight, and compatible with serverless deployments.

To set it up simply install it:

```bash
npm install micro --save
```

and then simply wrap your endpints with `micro()`:

```js
import micro from 'micro';

export default micro((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify({ name: 'Nextjs' }))
});
```

You may want to look into [awesome-micro](https://github.com/amio/awesome-micro) for a list of useful micro related packages.
