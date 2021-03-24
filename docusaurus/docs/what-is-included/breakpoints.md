---
id: breakpoints
title: Breakpoints
sidebar_label: Breakpoints
---

The boilerplate comes with a standardized set of breakpoints, with the following specs:

| Name | Breakpoint | Description |
| ---- | ---------- | ----------- |
| xxs | ≥0 | Normal mobile devices |
| xs | ≥480 | Large mobile devices or tiny tablets |
| sm | ≥768 | Small tablets |
| md | ≥1024 | Large tablets or tiny desktops |
| lg | ≥1280 | Small desktops |
| xl | ≥1440 | Normal desktops |
| xxl | ≥1920 | Large desktops |

## Targeting breakpoints

Inside `www/shared/styles/imports/custom-medias.css`, you will find [Custom Media Queries](https://github.com/postcss/postcss-custom-media) to target resolutions higher, higher or equal, lower and lower or equal for each breakpoint.

Here's an example:

```css
@import "../../shared/styles/imports";

.myPage {
    padding: 0 25px;

    @media (--lte-sm) {
        padding: 0 10px;
    }
}
```
