---
id: internationalization
title: Internationalization
sidebar_label: Internationalization
---

All of our projects have I18N support built-in, even if there's no need to initially have more than one locale. By having I18N support from the very beginning, the project itself is built with that in mind, making it very easy to add new locales in the future without having to refactor a good surface of your app.

We have chosen [`react-intl`](https://github.com/formatjs/react-intl/) for internalization and localization because:

- It has a large community and is being actively maintained.
- Built on the standard [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API.
- It can localize strings, numbers, dates and relative dates.
- Runs in the browser and Node.js.

The integration of `react-intl` into Next.js is made with [`@moxy/next-intl`](https://github.com/moxystudio/next-intl).

## Adding a new locale

1. Add the locale to the `intl/index.js` file, following the default `en-US` locale.
2. Add the messages file to `intl/messages/<locale>.json`.

## Adding a new policy

Policies control which locale is active at a given point, amongst other things.

You may want to create custom policies for certain use-cases. One common use-case is to have a policy that matches against the locale saved in the account preferences of authenticated users.

Please check `@moxy/next-intl`'s [documentation](https://github.com/moxystudio/next-intl#custom-policies) to know more.

## Removing this feature

If you are really sure internationalization is not needed in your project, you'll want to remove all the unnecessary `intl` related code. Be sure to follow these steps in order to clean your project properly:

1. Uninstall `react-intl`, `@moxy/next-intl` and `full-icu`.
2. Remove the `NODE_ICU_DATA` environment variable from both `dev` and `start` scripts, found in `package.json`.
3. Remove the `intl` folder.
4. Search globally for `react-intl` and `@moxy/next-intl` and remove the corresponding code across the project. Be sure to update your unit tests after cleaning up the code.
