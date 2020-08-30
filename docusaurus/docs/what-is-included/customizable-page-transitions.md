---
id: customizable-page-transitions
title: Customizable page transitions 
sidebar_label: Customizable page transitions
---

The boilerplate includes [`@moxy/react-page-swapper`](https://github.com/moxystudio/react-page-swapper) which eases out the implementation of page transitions.

A simple `fade` transition built with `<CSSTransition>` is included as an example on how you can orchestrate your custom page transitions.

The `PageSwapper` component also integrates with [`@moxy/next-router-scroll`](https://github.com/moxystudio/next-router-scroll) to handle scroll restoration for you.

For more details about all the possibilities `@moxy/react-page-swapper` gives you to customize your page transitions, check the [docs](https://github.com/moxystudio/react-page-swapper/blob/master/README.md).

## Removing this feature

If you don't need to include custom transitions to your pages you may want to remove this feature altogether. To do so, take the following steps:

1. Uninstall `@moxy/react-page-swapper`, `@moxy/next-router-scroll` and `react-transition-group`.
2. Delete the folder `www/modules/react-page-swapper`.
3. Search globally for `react-page-swapper` and `@moxy/next-router-scroll` and remove the corresponding code across the project.
4. Update your unit tests if necessary so that they all pass!
