---
id: testing-with-jest-rtl
title: Testing with Jest & RTL
sidebar_label: Testing with Jest & RTL
---

For testing, this boilerplate is configured to use [**Jest**](https://jestjs.io/) and [**react-testing-library**](https://github.com/testing-library/react-testing-library), providing strong options for testing varied types of code.

You can find more details about our implementation of Jest in its configuration file, `jest.config.js`, which uses our own [`@moxy/jest-config`](https://github.com/moxystudio/jest-config).

## RTL

We have historically used **Enzyme** for testing, however, with the introduction of new lifecycle methods and React hooks, we noticed that **Enzyme** did not keep up with their support for these new features.

Due to the nature of **react-testing-library**, we don't foresee it suffering from the same problems, and, together with moving towards a philosophy of testing with a stronger user perspective in mind, we rethought the tool we use for unit testing and have since then opted for **react-testing-library**.
