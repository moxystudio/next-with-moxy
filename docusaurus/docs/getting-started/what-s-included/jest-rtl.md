---
id: jest-rtl
title: Jest & RTL
sidebar_label: Jest & RTL
---

For testing, this boilerplate is configured to use [**Jest**](https://jestjs.io/) and [**react-testing-library**](https://github.com/testing-library/react-testing-library), providing strong options for testing varied types of code.

You can find more details about our implementation of Jest in its configuration file, `jest.config.js`, which uses our own [`@moxy/jest-config`](https://github.com/moxystudio/jest-config).

## RTL

Historically we used **Enzyme**, hover with the introduction of new lifecycle methods and React hooks, we noticed that **Enzyme** was behind in supporting those features.
Due to the nature of **react-testing-library**, we do not forsee the same problem with it.
That and the philosophy of testing with a more user perspective in mind, made us rethink the tool we use for unit testing and since then we opted for **react-testing-library**.
