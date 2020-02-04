---
id: favicon-os-theme
title: Changing favicon according to OS theme
sidebar_label: Changing favicon according to OS theme
---

If you want to add a different favicon for a specific OS theme you should do the following:

`npm install react-use-system-theme`

- Use the hook in the `App.js` file to get the current OS theme.

```js
import useSystemTheme from 'react-use-system-theme';

...

const systemTheme = useSystemTheme();
```

You can use `dark` or `light` as a parameter to setup a default theme. You can find more info [here](https://github.com/zebateira/react-use-system-theme).

- Add conditional clauses to the HTML. If your default favicon works better with a light background you should use `dark` theme for the conditional clauses. Example:

```js
{ systemTheme !== 'dark' &&
    <link rel="shortcut icon" href="/favicons/favicon.ico?v=M4KN2GElyG" />
}

{ systemTheme === 'dark' &&
    <link rel="shortcut icon" href="/favicons/favicon-dark.ico?v=M4KN2GElyG" />
}
```

This way you use the dark icon for the dark theme and the default icon to all the other cases.
