---
id: webpack-one-of-rules
title: Webpack oneOf rules
sidebar_label: Webpack oneOf rules
---

The boilerplate includes [`@moxy/next-webpack-oneof`](http://github.com/moxystudio/next-webpack-oneof), a Next.js plugin that makes oneOf loader rules the default rule type in webpack. This plugin bundles all rules in a webpack configuration inside a single [oneOf rule](https://webpack.js.org/configuration/module/#ruleoneof), to make it so files will never match two loader rules, since it will not fall through its first successful match.

This plugin makes it so the order of loaders in your `next.config.js` becomes very important, so if you're looking to add loader rules to your project you should go through [its documentation](http://github.com/moxystudio/next-webpack-oneof) to have a better understanding of where to place your rules.
