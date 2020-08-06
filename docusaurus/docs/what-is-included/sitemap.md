---
id: sitemap-robots
title: Sitemap & robots.txt
sidebar_label: Sitemap & robots.txt
---

The boilerplate includes a dynamic sitemap generator and a `robots.txt` file. Don't really know what a sitemap is? Check [this](https://support.google.com/webmasters/answer/156184?hl=en) out. Having a sitemap will help search engines and their crawlers index your whole website, including static and dynamic URL's, giving you better results in SEO ranks. [`@moxy/next-sitemaps`](https://www.npmjs.com/package/@moxy/next-sitemaps) helps make this a very simple task. 

To get started, the only thing you have to do is to specify the dynamic routes, if you have any, in `/pages/api/sitemap.xml.js`. Take a look at the step 2 of the usage section of the [docs](https://www.npmjs.com/package/@moxy/next-sitemaps#usage) to get a feel for it. You don't need to worry about static routes, as they will already be taken care of by the package. 

Also, while optional, it's recommended you check out the `cacheControl` option prop of the package [API](https://www.npmjs.com/package/@moxy/next-sitemaps#api), in order to optimize the creation of your sitemap. 

Access your sitemap at any time, at the `/api/sitemap.xml` route, to check if everything is according to plan. If you see a xml response with all your desired URL's, you're just about ready to go up in those SEO ranks!

> ℹ️ By default, the rules in the provided `robots.txt` make no restriction for any crawlers or pages, but you can tweak this to your liking in `/public/robots.txt`. Check the guidelines [here](https://support.google.com/webmasters/answer/6062596?hl=en). Also, you don't need to worry about the path to the sitemap, as `@moxy/next-sitemaps` will deal with it for both staging and production environments.

## Removing this feature

If you're not really into search engines indexing your pages, feel free to remove this feature, following these steps:

1. Uninstall `@moxy/next-sitemap`.
2. Remove all the `withSitemap` related code in `next.config.js`
3. Delete `pages/api/sitemap.xml.js` and `public/robots.txt`.