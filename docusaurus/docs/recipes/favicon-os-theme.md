---
id: favicon-os-theme
title: Changing favicon according to OS theme
sidebar_label: Favicon according to OS theme
---

Most operating systems now offer light and dark modes. Sometimes the default favicon does not work well in dark mode due to the lack of contrast. This recipe explains how to add a favicon variant for dark mode into the project.

## Walk-through

### 1. Generate the dark variant favicon files

It is recommended the use of the generator [RealFaviconGenerator](https://realfavicongenerator.net/). Follow these steps:

1. Select an image (PNG, JPG or SVG). Your image should be 260x260 or more for optimal results.

2. Tweak the options just for the "Favicon for Desktop Browsers and Google Result Pages" section. Please include a UI Designer in this process for optimal results.

3. ❗️ At the bottom, on the "Favicon Generator Options" section go to the "Compression" tab and select "Very high quality, very low compression factor".

4. Press the button to generate the favicon package. Once the package is ready, download it to your computer.

### 2. Add the files to the project

1. Extract the package you downloaded in the previous step and extract it to a temporary folder.

2. Rename `favicon-32x32.png`, `favicon-16x16.png` and `favicon.ico` to `favicon-dark-32x32.png`, `favicon-dark-16x16.png` and `favicon-dark.ico` respectively.

3. Copy these same files to the `public/favicons` folder.

### 3. Install `react-use-system-theme`

```sh
npm install react-use-system-theme
```

### 4. Use the `useSystemTheme` hook in the `App.js`

We will be using [react-use-system-theme](https://github.com/zebateira/react-use-system-theme) to get the current OS theme and conditionally render both favicon variants:

```js
// ...
import useSystemTheme from 'react-use-system-theme';

export const App = ({ Component, pageProps, router }) => {
    useEffect(() => trackPageViews(router), [router]);

    const systemTheme = useSystemTheme();

    return (
        <>
            <Head>
                { /*  ...seo tags */ }
                { systemTheme !== 'dark' && (
                    <>
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=M4KN2GElyG" />
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=M4KN2GElyG" />
                        <link rel="shortcut icon" href="/favicons/favicon.ico?v=M4KN2GElyG" />
                    </>
                ) }
                { systemTheme === 'dark' && (
                    <>
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-dark-32x32.png?v=M4KN2GElyG" />
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-dark-16x16.png?v=M4KN2GElyG" />
                        <link rel="shortcut icon" href="/favicons/favicon-dark.ico?v=M4KN2GElyG" />
                    </>
                ) }
                { /* ...other tags */ }
            </Head>
            ...
        </>
    );
};
```

Please note that some of the head tags were duplicated and are being rendered conditionally based on the system theme. Moreover, we have used the same version (`?v=xxxxx`) for both variants.
