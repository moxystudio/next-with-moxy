---
id: top-progress-bar
title: Top progress bar
sidebar_label: Top progress bar
---

A very subtle progress bar is displayed when Next.js is performing route changes, which can take some time depending on how fast the page assets and data (via `getInitialProps`, `getServerSideProps` or `getStaticProps` with `revalidate`).

We use the [`NProgress`](https://github.com/rstacruz/nprogress) library for the heavy-lifting of the progress bar UI. Under `shared/modules/nprogress`, you will find a `NProgress` sub-facade that:

- Has `start()` and `done()` methods that ref-count aware, meaning you can call them several times around your code-base; only the first start call and last done call will be accounted to show / hide the progress bar.
- Adds a built-in start delay, so that the progress bar is not shown right away.

## Removing this feature

If you are going to have another loading solution for Next.js page transitions, following these steps:

1. Uninstall `nprogress`.
2. Delete `shared/modules/nprogress` folder and its import & usage from `app/App.js`.
3. Delete `shared/styles/global/nprogress.css` and its import from `shared/styles/global/index.css`.
4. Remove the `--z-index-nprogress` CSS variable from `shared/styles/imports/variables.css`.
