---
id: node-modules-compiling
title: Node modules compiling
sidebar_label: Node modules compiling
---

The boilerplate includes [`@moxy/next-compile-node-modules`](https://github.com/moxystudio/next-compile-node-modules), a Next.js plugin that ensures Babel will compile `node_modules`.

As package authors aren't aware of what context their packages will be used in, this should instead be a concern of app developers, who would use use [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) to compile included packages to be compatible with their desired targets (e.g., "IE 11").

Popular boilerplate projects such as [`create-react-app`](https://github.com/facebook/create-react-app) now compile all `node_modules`, so we have opted to implement this behavior by default.
