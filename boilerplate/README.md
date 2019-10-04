# {project-name}

This repository holds the codebase for the website of {project-name}.

This project uses NextJS and was bootstrapped manually using MOXY's most used presets for tooling.

## Installation and setup

```sh
$ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run start`

Runs the app in production mode. Assumes a build was already produced before by the `build` script.

### `npm run export`

Exports the app to be served statically into the `out` folder. Assumes a build was already produced before by the `build` script.

### `npm run lint`

Lints all the project JS and CSS files, ensuring they match the coding-standards.

### `npm run test`

Run the test files found in the `src/` folder.

#### Options

Every option is passed to the `jest` command, however here are the most useful ones:

##### `<expression>`

If passed an expression, **Jest** will compare every file with that expression and only run tests of those whose match is positive.

##### `--coverage`

After tests, it outputs a table with the code coverage.
If the coverage is below the target, it throws an error.

This option is passed when tests are ran in the pipeline, which means that if the coverage is below the projects target, the pipeline will fail.

##### `--watch`

This options will not terminate the process once tests are complete and will observe any file changes and if detected, re-run the tests.

##### `-u`

This options will update every existing snapshot test with the result of the new snapshot tests.

#### Example

`npm run test -- App --coverage -u`

This example will run tests for files like `App.test.js` or `SpecialApp.test.js`, display the coverage (for the matched files) and update any existing snapshot.

## Webpack configuration

This boilerplate uses [`@moxy/next-common-files`](https://github.com/moxystudio/next-common-files) to push rules for common files into the Webpack configuration. Their implementation in this boilerplate standardizes a set of rules that define whether any given file should be loaded as a URL, a base64 translation, or inline content.

How any file  should be returned will depend on the presence of a suffixed descriptor in their filename, or, also, the lack thereof (with the exception of fonts, which will **always** be data-url). For example, a .png file you want to be parsed into a base64 string will need to be named '[name].data-url.png', but if you only need to be returned a url to the file, '[name].png' will be enough.

The following table explores all options.

| Suffix | Example | Plugins | Result |
|  ---   |     ---     | ---  |   ---   |
| none   | house.png  | All  | Will return a url |
| data-url   | house.data-url.gif | SVG and raster-images  | Will return a base64 translation |
| inline   | garden.inline.svg | SVG exclusively  | Will return content as stringified HTML |

## Environment variables

All environment variables will be be available to the server-side but only variables that start with `REACT_APP_` will be accessible to the client-side. This is made intentionality as a security measure, so that environment variables are exposed selectively. These will be embeded at **build time**, thus are **read-only**. This means you must rebuild your application every time you change them.

Here's the list of used **build-time** environment variables:

- `NODE_ENV`: One of `development` or `production` (automatically set).
- `REACT_APP_GA_TRACKING_ID`: The Google Analytics tracking ID to be used (if empty, tracking will be disabled).

Besides these variables, you may also define the `HOST` and `PORT` environment variables, which will be used to bind the server.

## Deployment

### Staging

There's a CI/CD pipeline configured for staging, allowing you to quickly preview outcome of changes.

If the build succeeds, any commit will be deployed on [now](https://zeit.co/now) and will have a unique URL for you to preview the deployment. Moreover, branches have fixed URLs, meaning they will stay the same even if they change over time in terms of commits.

These URLs will are available directly on GitLab, thanks to `now`'s tight integration.

### Production

#### With Docker

We provide a [`Dockerfile`](./Dockerfile) so that the project can be easily deployed with Docker.

Here's a simple way to build a image from the `Dockerfile`:

```sh
docker build \
    --build-arg GA_TRACKING_ID=12345 \
    -t "{project-name}:latest" \
    .
```

All **build time** environment variables are passed as `--build-arg`, as shown above for the `GA_TRACKING_ID`. Please check the `Dockerfile` for a list of all `ARG` lines that map to [environment variables](#environment-variables).

Now that we built the image, we may run it with:

```sh
docker run \
    --name={project-name} \
    -p 3000:3000 \
    --restart=unless-stopped \
    -d {project-name}:latest
```

The `--restart` option is especially important to ensure that Docker restarts the process on errors or unhandled crashes.

#### Statically

As of now, this website may be deployed statically. To do so, generate a static build of the project by running:

```sh
npm run build
npm run export
```

This will create a `out/` directory that can be served statically.

Environment variables may be defined before running the above commands, which is useful to define **build time** [environment variables](#environment-variables). Here's an example:

```sh
export REACT_APP_GA_TRACKING_ID=12345
```
