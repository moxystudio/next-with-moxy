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
- Pass that `ARG` into an `ENV` argument that will exist inside the application's process.

Example:

```bash
# Define build arguments
ARG SOME_ARGUMENT

# Define environment variables
ENV SOME_ENV_VAR ${SOME_ARGUMENT}
```

You can check the existing `Dockerfile` to see how we're configuring `GA_TRACKING_ID` for an example on this process.
