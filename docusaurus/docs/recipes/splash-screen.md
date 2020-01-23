---
id: splash-screen
title: Adding a splash screen
sidebar_label: Splash screen
---

Certain pages have impactful experiences. These experiences can make the total bundle size larger as they pack possibly large dependencies and media assets, such as 3D objects and audio files.

It's then often normal to preload all the required files for an uninterrupted experience. This recipe explains how you can leverage [`@moxy/react-wait-for-react`](https://github.com/moxystudio/react-wait-for-react) to display a **splash screen** before your static or server-side rendered app becomes interactive, and optionally until all the required files are loaded (via a promise).

⚠️ You should still render the app or page contents "below" the splash screen, to keep your website SEO friendly.

## Walk-through

### 1. Install `@moxy/react-wait-for-react`

```sh
npm i `@moxy/react-wait-for-react`
```

### 2. Add `<SplashScreen />` to your project

Copy the [`splash-screen`](https://github.com/moxystudio/next-with-moxy/tree/master/docusaurus/static/recipes-assets/splash-screen) component folder into `www/shared/components` and edit `www/shared/components/index.js` to export it:

```js
// ....
export { default as SplashScreen } from './splash-screen';
```

Finally, adjust the component you just copied according to what was designed for your project.

ℹ️ As a rule of thumb, you should show the app icon or a welcoming message in the splash screen while the page is being preloaded, and only reveal a loading indicator after **2 or 3 seconds**. Users don't like seing a loading indicator, therefore we defer showing it only if the preload is taking more than usual.

### 3. Add the error message translation

The `splash-screen.error` message will be displayed in case the promise is rejected. If your translations are defined in `intl/messages`, add the following entry into each locale's json (translated according to each language):

```json
{
    "splash-screen.error": "Oops, something went bad. Please refresh to try again."
}
```

### 4. Include `<SplashScreen />` into your root layout(s)

Because browsers stream the HTML response from the server and render it as soon as possible, the splash screen should be one of the top most HTML elements. One way to do this, is to include the `<SplashScreen />` in your root layout(s).

As an example, here's how you would integrate `<SplashScreen />` into the built-in `<MainLayout />`:

```js
// ...
import SplashScreen from '../splash-screen/SplashScreen';

// ...

const MainLayout = ({ splashPromise, splashOnDone, children }) => (
    <>
        { splashPromise && (
            <SplashScreen
                promise={ splashPromise }
                onDone={ splashOnDone } />
        ) }

        // ...
    </>
);

MainLayout.propTypes = {
    splashPromise: PropTypes.object,
    splashOnDone: PropTypes.func,
    // ...
};
```

### 5. Finally, use it in a page

Assuming you integrated the splash screen into the `<MainLayout />` as exemplified above, you could then use `withLayout` to set the layout's `splashPromise` prop directly from a page. Here's an example of the `<Home />` page defining a fake `splashPromise` that resolves in 5 seconds: 

```js
// ...
import { withLayout } from '@moxy/next-layout';
import { MainLayout } from '../../shared/components';

// ...

// This promise should load the assets necessary for the experience,
// such as 3D objects, materials, videos, audio files, etc.
// Optionally, it may be a PPromise that reports progress: https://github.com/sindresorhus/p-progress
const splashPromise = new Promise((resolve) => setTimeout(resolve, 5000));

const Home = () => (
    // ...
);

export default withLayout(<MainLayout splashPromise={ splashPromise } />)(Home);
```

ℹ️ If your project doesn't use `@moxy/next-layout` nor layouts, you may instead use `<SplashScreen />` directly at the top of your page components.
