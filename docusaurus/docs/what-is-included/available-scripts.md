---
id: available-scripts
title: Available scripts
sidebar_label: Available scripts
---

Here you'll find scripts that we have defined in our `package.json`.

You can run any of these commands using `npm run {script}` from the project's folder.

## `npm run start`

This script runs your application in a production environment, which will then be available at http://localhost:3000.
If you need to use another port, please follow the instructions in the dev script above.

Keep in mind, you must run the build script before running this script!

## `npm run build`

This script will build your application to be production ready, and you'll find the bundle afterwards in the `.next` folder.
This will be an optimized build, with hashed filenames.

This command also runs a pre-script called `prebuild` that will clean assets created with the build script, namely the `.next` folder.

## `npm run test`

This script will run your tests.
Our configuration shows coverage reports for all tests.
Please refer to the `jest.config.js` file for more configuration details.

## `npm run dev`

This script runs your application in a development environment.
You application will then be available at http://localhost:3000.
However, if you need to use a different port, you can set the PORT environment variable with the command line, using the following script and changing `{PORT_NUMBER}` with the port you wish to use:

```bash
npm run dev -- --port={PORT_NUMBER}
```

When running in a development environment, Next.js will only build pages as they're requested to reduce the impact of this process on your computer's performance.
In this environment, it's normal that when changing to another page the styles are not yet applied.
You have to refresh the page, because Next.js might have been unable to compile the new page applying Hot Module Replacement styles.
This will not happen in a production environment, because all pages will have already been built before the start of the application.

## `npm run docs`

This script prepares the documentation for reading.
This script will automatically open the documentation in your default browser.

Keep in mind, you must have your documentation's dependencies installed before running this script!
To to so, please run `npm install --prefix docusaurus` first.

## `npm run release`

This script updates your CHANGELOG.md file, following [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://conventionalcommits.org) conventions and generates a new git tag (to read more about this process, you can read through the standard-version documentation).

This command also runs a post-script called `postrelease` that will push your release (git tag) to your master branch.

## `npm run lint`

This script lints your javascript and CSS files.

### `npm run lint:eslint`

This script lints only your Javascript files.

### `npm run lint:stylelint`

This script lints only your CSS files.
