---
id: file-loaders
title: File loaders for most common files
sidebar_label: File loaders for most common files
---

The boilerplate includes [`@moxy/next-common-files`](https://github.com/moxystudio/next-common-files), a Next.js plugin that exports webpack loader rules for common files like images and fonts.

This plugin comes with options that give the developer some choice about how their files are loaded, and this boilerplate uses certain **filename conventions** to specify how certain files are loaded into the web application.
We implement these filename conventions through suffixes that we add to the filename itself.

Here's a list of all options:

- `.data-url.`: This suffix is used when you want a file to be translated into base64 and sent with your bundle instead of being loaded with a standard URL (e.g., for assets above the fold, you might want to use this to avoid [flashing of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)).
- `.inline.` This suffix is used when you want your `.svg` files to be put as inline HTML on your pages.
This suffix is only available for `.svg` files.
- No suffix: When none of those suffixes are used, the files will be loaded as URL.

Keep in mind that though these are preset conventions, they can be changed.
Should you want to change them or implement more of these filename suffixes still, you can do so in the `next.config.js` file.