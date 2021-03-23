---
id: inner-vh
title: Proper vh CSS unit on Mobile
sidebar_label: Inner vh CSS
---

Some mobile browsers define a fixed value for the vh based on the maximum height of the screen. By doing so, the user would not experience jumps on the page once the address bar went out of view. However, in some situations, you want to to target the visible viewport (inner), regardless of the address bar being visible or not.

To address this, this recipe allows you to target the inner viewport height using the `--inner-vh` CSS variable.

## Walk-through

### 1. Installing the necessary dependencies

```sh
$ npm i inner-vh detect-it
```

### 2. Setup inner-vh module

```js
// www/app/App.js
import { innerVh } from 'inner-vh';
import { deviceType } from 'detect-it';

// ...

if (typeof window !== 'undefined') {
    // Apply module that updates the --inner-vh CSS variable.
    innerVh({
        customPropertyName: 'inner-vh',
        // Update --inner-vh on desktop alike always.
        ignoreCollapsibleUi: deviceType === 'touchOnly',
        // Seems to be 114px on iOS safari.
        maximumCollapsibleUiHeight: 120,
    });
}

// ...
```

### 3. Setup PostCSS to ignore `--inner-vh`

```js
'use strict';

module.exports = require('@moxy/postcss-preset')({
    // ...
    cssVariables: {
        preserveAtRulesOrder: true,
        preserve: (declaration) => {
            // Keep --inner-vh usage intact, useful for mobile.
            if (!declaration.prop.startsWith('--') && declaration.value.includes('--inner-vh')) {
                return true;
            }

            return false;
        },
    },
});
```

### 4. Now use it!

```css
.foo {
    height: calc(var(--inner-vh, 1vh) * 100);
}
```

> ℹ️ The second argument of var is the fallback, which should be `1vh`. This is necessary, because the CSS var is only injected after the module is initialized.
