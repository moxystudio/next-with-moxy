---
id: instructions
title: Instructions
sidebar_label: Instructions
---

To kick-start your own project from this boilerplate, you can fork it from its [repository](https://github.com/moxystudio/next-with-moxy).
Afterwards, you'll just need to install its dependencies and you're good to go! 🚀

## Preparing for delivery

Keep in mind, part of adapting this boilerplate into a deliverable project is also changing this document into one that's about your project in specific. There are some things you must change to clean up any evidence of using this boilerplate:

1. Change all instances of `{project-name}` into the name of your project:

    You must change all instances of {project-name} into the name of your project, which you can find by using your editor to search the entire workspace for project-name.

    In any case, here's a list of all places you'll find it:
    - `package.json`: In the `name` field.
    - `App.data.js`: In the `title` field.
    - `Contacts.data.js`: In the `name` field. This file is a sample file and you might want to delete it altogether.
    - In this document, in case you want to use it.

2. Change all instances of `{project-domain}` into the domain that will be used in production:

    - `package.json`: In the `description` field.
    - `App.data.js`: In the `url` field.

3. Delete the following files:

    - `LICENSE`

4. Tweak the root README.md file of the project:

    ````md
    # {Project Name}

    {Brief explanation of the project}

    ## Documentation

    This project comes with a documentation web page. To view it:

    ```bash
    npm i --prefix docusarus
    npm run docs
    ```
    ````

5. Remove algolia search from Docusaurus config:

    Remove the `themeConfig.algolia` key from `docusaurus/docusaurus.config.js`. The reason is that the search results indexed by Algolia will become out of sync with the documentation, causing it to possibly return wrong results (404 pages).


6. Prepare the rest of the documentation website to be deliverable to your clients!
