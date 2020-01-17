---
id: css-modules
title: CSS Modules with PostCSS
sidebar_label: CSS Modules with PostCSS
---

CSS Modules are `.module.css` files that can be locally scoped.

This boilerplate is configured so all `.module.css` files can be used as modules by default thanks to Next.js' [9.2.0](https://nextjs.org/blog/next-9-2) version which introduces built-in CSS Support for both global and component-level stylesheets.

We also use [**PostCSS**](https://postcss.org/) to transform the styles according our browser targets defined in `package.json`. To do so, we apply our own preset: [`postcss-preset-moxy`](https://github.com/moxystudio/postcss-preset-moxy).
