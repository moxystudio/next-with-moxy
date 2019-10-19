---
id: everything-else
title: And everything that comes with Next.js
sidebar_label: And everything that comes with Next.js
---

## File-System Routing

Next.js comes with a default routing system, which will serve each file in the `/pages` folder with pathname corresponding to the filename. For example, `/pages/some_page.js` would be server at `website.com/some_page`.

## Automatic Code Splitting

Next.js will automatically know not to reload content that is very common in your application, loading only what is unique to each page, improving load time performance.

## Server Side Rendering

Next.js is built to render pages server side, and rehydrate them in the client whenever it's necessary.

If you're looking for more information about server-side rendering and its benefits, you can read through [this article](https://developers.google.com/web/updates/2019/02/rendering-on-the-web), where rehydration is also covered.

## Static Exporting

Next.js guarantees that static pages also benefit from these features, as well as other things still, like dynamic imports and prefetching.

## And more

Check the [Next.js documentation](https://nextjs.org/#more) for all the features available.