---
id: conventions
title: Conventions
sidebar_label: Conventions
---

This boilerplate establishes some conventions that the team executing the project should follow.

## Folder structure

The folder-structure convention favours co-location of assets and their requesters. Here's how it looks like:

```
├── server.js
├── pages
│   ├── _app.js
│   └── index.js
└── www
    ├── app
    ├── pages
    │   └── home
    │   │   ├── index.js
    │   │   ├── Home.js
    │   │   ├── Home.test.js
    │   │   ├── Home.data.js
    │   │   ├── Home.css
    │   │   └── components
    │   └── ...
    └── shared
        └── components
        │   └── ...
        └── media
        │   └── favicons
        │  	└── fonts
        │   └── images
        └── styles
```

...where:

- `pages`: This folder is necessary for Next.js since we're taking advantage of its file system routing, and this is where Next.js will search for files to route to by default.
- `www`: Where the code for your application will be.
    - `app`: Where your App component will be.
    - `pages`: Where you can store the source code of your pages. This means that every file in `/pages` will import a component from here. We use this method since we only use `/pages` for routing and `www` for code that will be compiled.
        - `home`: This an example of a component and the structure you'll find inside. Commonly, you'll find the following files here:
            - `index.js`: This file will simply export your component file.
            - `Home.js`: This is your component file.
            - `Home.test.js`: This is the test file corresponding to this component.
            - `Home.data.js`: This is where you'll find data that will be used by this component. You can find a more in depth explanation of this file convention further below.
            - `Home.css`: This is where you'll have styles that are only used in this component.
            - `components`: If you have abstracted parts of this component into smaller components, use this folder to co-locate them.
    - `shared`: Where you can put content that is shared between pages and cannot be directly co-located with its interested parties.
        - `components`: The folder for components that are shared between pages. You can find an example just above of what files each component is expected to have.
        - `media`: The folder for media (images, fonts, etc.) that is shared between many components.
            - `favicons`: This is where you can store your favicons.
            - `fonts`: This is where you can store your font files.
            - `images`: This is where you can store image files.
        - `styles`:  The folder for `.css` files that are shared between many components.

## Data Files

One of our file naming conventions is for when you can extract data from a file that needs it and co-locate it with the `.data.` suffix.

For example, let's say you have data in your `Contacts.js` component that you can extract to another file, you'd extract it to a file named Contacts.data.js that would be placed right next to the original file.
