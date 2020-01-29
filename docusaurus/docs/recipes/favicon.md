---
id: recipe-add-favicon-manifest
title: Generate favicons & manifest
sidebar_label: Generate favicons & manifest
---

In this recipe, you will be guided through the process of setting up a favicon for your app that is supported by the latest versions of the [browsers](https://browserl.ist/?q=last%202%20Chrome%20versions%2C%20last%202%20Firefox%20versions%2C%20last%202%20Safari%20versions%2C%20last%202%20Edge%20versions%2C%20last%202%20ChromeAndroid%20versions%2C%20last%202%20iOS%20versions) this boilerplate supports.

## Walk-through

### 1. Use a favicon generator

It is recommended the use of the generator [RealFaviconGenerator](https://realfavicongenerator.net/). Follow the next steps:

- Select an image (PNG, JPG or SVG). Your image should be 260x260 or more for optimal results.

- Configure all the options (background, margins, ...) for each browser.

- [**Important**] At the bottom, on the "Favicon Generator Options" section:
  - Go to the "Path" tab, select the second option and write `/favicons`.
  - Go to the "Version/Refresh" tab and select the second option.
  - Go to the "App name" tab, select the second option and add your app name.

- Click on the button to generate the favicons and HTML code.

- You will be redirected to another page. Download the package and save the HTML code.

### 2. Add the files to the `public/favicons` folder

You should add all the files to the `public/favicons` folder

### 3. Add the HTML code to `www/app/App.js`

Finally just add the HTML code generated and place it before "Facebook & search engines".
