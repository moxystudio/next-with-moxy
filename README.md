# next-with-moxy

MOXY's boilerplate to create Next.js based applications

This project uses [Next.js](https://nextjs.org) and was bootstrapped manually using MOXY's most used presets for tooling.

## Motivation

Isomorphic JavaScript applications could be pretty challenging and hard to setup.

With [Next.js](https://nextjs.org) server rendering React applications become a lot easier, but there is always a need to configure some more specefic tooling for our projects.

`next-with-moxy` offers you the required tooling for your universal JavaScript application, as well as an opinionated frontend stack ready to kick-off your next project.

## What's Included?

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org)
- [Babel](https://babeljs.io) with [babel-preset-moxy](https://github.com/moxystudio/babel-preset-moxy)
- [PostCSS](http://postcss.org/) with [postcss-preset-moxy](https://github.com/moxystudio/postcss-preset-moxy)
- [Webpack](https://webpack.js.org/)
- [ESLint](https://eslint.org/) with [eslint-config-moxy](https://github.com/moxystudio/eslint-config-moxy)
- [Stylelint](https://stylelint.io/) with [stylelint-config-moxy](https://github.com/moxystudio/stylelint-config-moxy)
- [Express](https://expressjs.com/)
- [Node](https://nodejs.org)
- [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme)
- Dockerfile

## Table of Contents

- [Installation and setup](#installation-and-setup)
- [Used in](#used-in)

## Installation and setup

Use the boilerplate available in the `boilerplate` folder since it provides everything needed to start.

Before using, change some information specific to the project. In the `pacakge.json` replace `name`, `description` and `repository.url`. 

Detailed information about the boilerplate is available in its [README](boilerplate/README.md).

## Recipes

[Recipes](recipes/README.md) provide detailed infomartion on how to use certain features that are not enabled by default.

## Used In

- [Platforme](http://platforme.com/)
- [dashdash](https://dashdash.com)
