---
id: conventions
title: Conventions
sidebar_label: Conventions
---

This boilerplate establishes some conventions that the team executing the project should follow.

## Folder structure

The folder-structure convention favours co-location of assets and their requesters. Here's how it looks like:

```
├── package.json
├── package-lock.json
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
    │   │   ├── Home.module.css
    │   │   ├── hero
    │   │   │   ├── index.js
    │   │   │   ├── Hero.js
    │   │   │   ├── Hero.test.js
    │   │   │   └── Hero.module.css
    │   │   └── ...
    │   └── ...
    └── shared
        └── modules
        │   ├── api-sdk
        └── react
        │   ├── button
        │   ├── card
        │   ├── progress-bar
        │   ├── icons
        │   │   ├── svgs
        │   │   └── index.js
        │   └── ...
        └── media
        │   └── fonts
        │   └── images
        |   └── ...
        └── styles
```

...where:

- `pages`: This folder is necessary for Next.js since we're taking advantage of its file system routing, and this is where Next.js will search for files to route to by default.
- `www`: Where the code for your application will be.
    - `app`: Where your App component will be.
    - `pages`: Where you can store the source code of your pages. Every file in `/pages` will import a component from here. We use this method since we only use `/pages` for routing and `www` for code that will be compiled. Usually, a page is a set of sections and each section can be a set of another sections or a set of components. You have enough freedom to create logical groups according to the page composition. However, make sure the file structure chosen inside `www/pages` reflects it and is clear to every other developer.
        - `home`: This an example of a component and the structure you'll find inside. Commonly, you'll find the following files here:
            - `index.js`: This file will simply export your component file.
            - `Home.js`: This is your component file.
            - `Home.test.js`: This is the test file corresponding to this component.
            - `Home.data.js`: This is where you'll find data that will be used by this component. You can find a more in depth explanation of this file convention further below.
            - `Home.module.css`: This is where you'll have styles that are only used in this component.
            - `hero`: This is an example of a section for the `Home` page. The folder should follow the same common structure:
            	- `index.js`: This file will export the section component.
            	- `Hero.js`: This is your component file.
            	- `Hero.test.js`: This is the test file corresponding to this component.
            	- `Hero.module.css`: This is where you'll have styles that are only used in this component.
    - `shared`: Where you can put content that is shared between pages and cannot be directly co-located with its interested parties.
        - `modules`: The folder for modules that are shared between pages. Here you can store components, services such as your web API clients, etc. You can find an example in the diagram above of what files this folder might have. Please note that every module should have a good prefix for better understandability. For example, a react based module should have `react-` as a prefix.
        - `media`: The folder for media (images, fonts, etc.) that is shared between many components.
            - `favicons`: This is where you can store your favicons.
            - `fonts`: This is where you can store your font files.
            - `images`: This is where you can store image files.
        - `styles`:  The folder for `.css` files that are shared between many components.

## Data Files

One of our file naming conventions is for when you can extract data from a file that needs it and co-locate it with the `.data.` suffix.

For example, let's say you have data in your `Contacts.js` component that you can extract to another file, you'd extract it to a file named Contacts.data.js that would be placed right next to the original file.
