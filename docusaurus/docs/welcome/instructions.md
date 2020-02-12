---
id: instructions
title: Instructions
sidebar_label: Instructions
---

To kick-start your own project from this boilerplate, you can fork it from its [repository](https://github.com/moxystudio/next-with-moxy).
Afterwards, you'll just need to install its dependencies and you're good to go! 🚀

Keep in mind, part of adapting this boilerplate into a deliverable project is also changing this document into one that's about your project in specific. There are some things you must change to clean up any evidence of using this boilerplate.

## 1. Tweak some project files

1. Change all instances of `{project-name}` into the name of your project:

    You must change all instances of {project-name} into the name of your project, which you can find by using your editor to search the entire workspace for project-name.

    In any case, here's a list of all places you'll find it:
    - `package.json`: In the `name` field.
    - `App.data.js`: In the `title` field.
    - `Contacts.data.js`: In the `name` field. This file is a sample file and you might want to delete it altogether.
    - In this document, in case you want to use it.

2. For local development, create a `.env` file and set a value for `SITE_URL` environment variable. You will likely want to use the provided example, `http://localhost:3000`

3. Delete the following files and folders:

    - `LICENSE`
    - `.github`

## 2. Replace the root README.md

Replace the root README.md file of the project with:

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

## 3. Setup favicon & manifest

1. Use a favicon generator

    It is recommended the use of the generator [RealFaviconGenerator](https://realfavicongenerator.net/). Follow the next steps:

    1. Select an image (PNG, JPG or SVG). Your image should be 260x260 or more for optimal results.

    2. Tweak the options for each of the sections. Please include a UI Designer in this process for optimal results.

    3. ❗️ At the bottom, on the "Favicon Generator Options" section go to:
        - The "Path" tab, select the second option and write `/favicons`.
        - The "Version/Refresh" tab and select the second option.
        - The "Compression" tab and select "Very high quality, very low compression factor".
        - The "App name" tab, select the second option and add the name of your project.

    4. Press the button to generate the favicon package and HTML code. Once the package is ready, download it and save the HTML code.

2. Add the files to the `public/favicons` folder

    Extract the package you downloaded to the `public/favicons` folder, overwriting all the files that are already there.

3. Add the HTML code to `www/app/App.js`

    Finally, add the HTML code you previously saved to the `<Head>`, replacing the same tags that are already there.

ℹ️ Most operating systems now offer light and dark modes. You may [setup different favicons for each OS theme](/docs/recipes/favicon-os-theme) if the favicon does doesn't have enough contrast in dark mode.

## 4. Setup documentation

1. Remove algolia search from Docusaurus config:

    Remove the `themeConfig.algolia` key from `docusaurus/docusaurus.config.js`. The reason is that the search results indexed by Algolia will become out of sync with the documentation, causing it to possibly return wrong results (404 pages).

2. Prepare the rest of the documentation website to be deliverable to your clients!
