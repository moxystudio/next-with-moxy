---
id: css-modules
title: CSS Modules with PostCSS
sidebar_label: CSS Modules with PostCSS
---

CSS Modules are `.css` files that can be locally scoped.

This boilerplate is configured so all `.css` files can be used as modules by default using the official CSS plugin from Zeit: [`@zeit/next-css`](https://github.com/zeit/next-plugins/tree/master/packages/next-css).

Our configuration is set so that during development, the names of the classes will be `<Filename>__<Class>___<Hash>` so it's easier to debug.
In production all classes are minified to a unique hash.

We also use [**PostCSS**](https://postcss.org/) to transform the styles according our browser targets defined in `package.json`. To do so, we apply our own preset: [`postcss-preset-moxy`](https://github.com/moxystudio/postcss-preset-moxy).
