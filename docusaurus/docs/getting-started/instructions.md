---
id: instructions
title: Instructions
sidebar_label: Instructions
---

`next-with-moxy` is MOXY's boilerplate for bootstrapping React applications using Next.js, to accelerate the setup of new projects and allow developers to very quickly start building their web applications.
This boilerplate includes all tools and configurations necessary to get it up and running as soon as possible.

To use this boilerplate to build your own project, you can fork it from its [repository](https://github.com/moxystudio/next-with-moxy).
Afterwards, you'll just need to install its dependencies and you're good to go.

Keep in mind, part of adapting this boilerplate into a deliverable project is also changing this document into one that's about your project in specific.
There are some things you must change to clean up any evidence of using this boilerplate!
Things such as:

- Change all instances of `{project-name}` into the name of your project:
> You must change all instances of {project-name} into the name of your project, which you can find by using your editor to search the entire workspace for project-name.
> In any case, here's a list of all places you'll find it:
  - `package.json`: In the `name` field.
  - `App.data.js`: In the `title` field.
  - `Contacts.data.js`: In the `name` field. This file is a sample file and you might want to delete it altogether.
  - In this document, in case you want to use it.
- Change all instances of `{project-domain}` into the domain that will be used at production:
  - `package.json`: In the `description` field.
  - `App.data.js`: In the `url` field.
- Prepare the rest of this document to be deliverable to your clients!
