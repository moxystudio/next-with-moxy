---
id: favicon-os-theme
title: Changing favicon according to OS theme
sidebar_label: Changing favicon according to OS theme
---

Most operating systems offer by now light and dark modes. Sometimes your favicon might not be visible in one of the themes.

This recipe explains how to use different favicons for different OS themes. To do so follow the next steps:

1. Install `react-use-system-theme`.

   `npm install react-use-system-theme`

2. Use the `useSystemTheme` hook in the `App.js` file to get the current OS theme.

   You can use `dark` or `light` as a parameter to setup a default theme. Find more info [here](https://github.com/zebateira/react-use-system-theme).

3. Add the new favicon files to the `public/favicons` folder.

4. Add conditional clauses to the HTML.

   If your default favicon works better with a light background you should use `dark` theme for the conditional clauses or vice versa.

Example of the `App.js` file:

```js
// ...other imports
import useSystemTheme from 'react-use-system-theme';

export const App = ({ Component, pageProps, router }) => {
    useEffect(() => trackPageViews(router), [router]);

    const systemTheme = useSystemTheme();

    return (
        <>
            <Head>
                {/* SEO tags */}
                { systemTheme !== 'dark' &&
                    <link rel="shortcut icon" href="/favicons/favicon.ico?v=M4KN2GElyG" />
                }
                { systemTheme === 'dark' &&
                    <link rel="shortcut icon" href="/favicons/favicon-dark.ico?v=M4KN2GElyG" />
                }
                {/* Other tags */}
            </Head>
            ...
        </>
    );
};
```

In this example we use the "dark favicon" only for the dark theme and the default favicon to all the other cases.
