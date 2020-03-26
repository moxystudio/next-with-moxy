---
id: docker
title: Docker
sidebar_label: Docker
---

We provide a `Dockerfile` so that you can easily use [**Docker**](https://www.docker.com/) to run the application you're building in a containerized environment.

To run this app in Docker, you can use the following commands from the project's folder:

```bash
docker build -t {project-name}:latest .
docker run --name={project-name} -p 3000:3000 --restart=unless-stopped -d {project-name}:latest
```

Afterwards you'll be able to find your project running at [http://localhost:3000](http://localhost:3000).

This `Dockerfile` is also how you can pass environment variables to your Docker container running this application. In the `Dockerfile`, you do this with two steps:

- Define an `ARG` for the variable to be received.
- Pass that `ARG` into an `ENV` argument that will exist during the build process as well as the server-runtime process.

Example:

```bash
# Define build arguments & map them to environment variables
ARG SOME_ARGUMENT
ENV SOME_ENV_VAR $SOME_ARGUMENT
```

You can check the existing `Dockerfile` to see how we're configuring `GTM_CONTAINER_ID` and `SITE_URL`.

## Multi-stage builds

The Dockerfile we provide allows for [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/), with the following benefits:

- The final runtime image is much lighter because it doesn't contain dev dependencies and other intermediate artifacts produced during the build phase.
- It allows to target a specific stage when building, which is useful to create a CI/CD pipeline. As an example, you may run the project tests by specifying `--target check` when calling `docker build`.

> ℹ️ You may leverage Docker [BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/) to [skip stages](https://github.com/docker/cli/issues/1134#issuecomment-399005853) that are not needed for the specified target. To do so, set DOCKER_BUILDKIT=1 when running `docker build`.
