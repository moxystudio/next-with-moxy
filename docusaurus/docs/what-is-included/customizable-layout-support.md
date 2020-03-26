---
id: customizable-layout-support
title: Customizable layout support 
sidebar_label: Customizable layout support
---

The boilerplate includes customizable layout support with [`@moxy/next-layout`](https://github.com/moxystudio/next-layout/). This easily allows for your application to have a layout applied to all pages. If you don't want to have all pages with the same layout though, you can develop another one as multiple layouts are also supported. Furthermore, `@moxy/next-layout` also supports nested layouts, so if you want to put a layout inside a layout, you're perfectly fine to do so.

A `<MainLayout />` component, with a simple header and footer, comes with the boilerplate and is the default layout. You can modify it in whatever way you see fit. Let's say you want your footer to be optional, so that you can hide it in some pages. Just add a `withFooter` prop to `<MainLayout />`, and then wrap the page in which you want to hide the footer with `withLayout`:

```js
export default withLayout(<MainLayout withFooter={ false } />)(About);
```

For more details about all the possibilities `@moxy/next-layout` gives you to customize your layouts, check the [docs](https://github.com/moxystudio/next-layout/blob/master/README.md).

## Removing this feature

If your project is composed of a simple page where a layout is not needed, this feature becomes unnecessary and you may want to remove it altogether. To do so, take the following steps:

1. Uninstall `@moxy/next-layout`.
2. Remove the `<MainLayout />` component and its associated components.
3. Remove all the usages of `@moxy/next-layout` throughout the project so they don't pollute your code. A global search for `@moxy/next-layout` should speed up this process.
4. Update your unit tests if necessary so that they all pass!
