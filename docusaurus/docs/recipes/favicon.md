---
id: recipe-add-favicon
title: Adding a favicon
sidebar_label: Adding a favicon
---

In every project it is necessary to add a favicon to improve the user experience.

In this recipe, you will be guided through the process of adding a favicon that is supported by the latest versions of the [browsers](https://browserl.ist/?q=last%202%20Chrome%20versions%2C%20last%202%20Firefox%20versions%2C%20last%202%20Safari%20versions%2C%20last%202%20Edge%20versions%2C%20last%202%20ChromeAndroid%20versions%2C%20last%202%20iOS%20versions) this boilerplate supports.

## Walk-through

### 1. Use a favicon generator

It is recommended the use of the generator [realfavicongenerator](https://realfavicongenerator.net/).
All you need to do is add the image and the generator will give you a `.zip` with all the necessary files.

### 2. Add the favicon files to the folder `www/shared/media/favicons`

It is recommended to add the following files:
- `.ico` format - `favicon.ico`*
- `.png` format 16x16 - `favicon-16x16.png`*
- `.png` format 32x32 - `favicon-32x32.png`*
- `.png` format 180x180 - `apple-touch-icon.png`*
- `.svg` format - `safari-pinned-tab.svg`*

\* Name of the files provided by the generator

### 3. Import the icons and add the tags to the `www/app/App.js` file

```js
import Favicon from '../shared/media/favicons/favicon.ico';
import IconApple from '../shared/media/favicons/apple-touch-icon.png';
import Icon16 from '../shared/media/favicons/favicon-16x16.png';
import Icon32 from '../shared/media/favicons/favicon-32x32.png';
import IconSafariPinned from '../shared/media/favicons/safari-pinned-tab.svg';

...

<Head>
    ...
    <link rel="shortcut icon" type="image/x-icon" href={ Favicon } />
    <link rel="apple-touch-icon" href={ IconApple } sizes="180x180" />
    <link rel="icon" type="image/png" href={ Icon16 } sizes="16x16" />
    <link rel="icon" type="image/png" href={ Icon32 } sizes="32x32" />
    <link rel="mask-icon" href={ IconSafariPinned } color="#5bbad5" />
```
