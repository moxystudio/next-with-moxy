---
id: contentful
title: Implementing Contentful
sidebar_label: Contentful
---

This recipe aims to guide you through the implementation of Contetful in the project and also provides custom solutions for different use-cases.  

### What is a CMS?

A CMS, or Content Management System, is a platform that helps in the creation and management of content to be consumed in a web application. In short, these services provide a database and a database management system with a layer of usability on top that makes them inclusive to users without technical expertise.

### Contentful

[Contenful](https://www.contentful.com/) is one such CMS, and the object of this recipe.

For more information about **Contentful**'s API please [refer to their documentation](https://www.contentful.com/developers/docs/).

## Modeling your database

As a developer working on the App that will consume the content stored in the CMS, you're also responsible for creating and modeling the database itself. This will mean creating new content models that must be usable by the client team which will eventually handle **Contentful** after hand off of the project. One **major** consideration to have is the usability and readability of the content models you're creating, remember that they are meant to be usable without any previous technical knowledge of this context. 

**Contentful** offers many options for validations and input appearance and descriptions to help the users understand what kind of input is expected, and you should use all of them to minimize the chance of users not understanding what's expected of them, in what ways they are limited, reducing the chances of unexpected content in your application.

Keep in mind:

→ Always use appropriate types when possible,

→ Always use validation where appropriate,

→ Write titles and descriptions to ensure the user knows what's expected of that field.

## Localization

**Contentful** makes it easy to add localized content to your application. Once you define a locale, which you can do in the Locales option in the Settings menu, you can specify in each field you create whether they can be localized, in what languages, etc., giving you fine control over what needs to be localized and what doesn't. 

Once having these locales, you can then use the **Contentful** API signaling your desired locale through the `locale` field. You'll find an example of this in the next section.

## Preview

Contentful allows you to fetch content that is not in a `published` state, also including content that is in a `changed` or `draft` state.  This can help users see how content would look on their website before publishing it and making it available on for every visitor.

However, Contentful **does not validate content that is not published.** This means that, if your app relies on validation from Contentful, **it will likely break in preview mode unless all content in Contentful already passes validation.** This is assumed and must taken into account when developing your applications and communicated to potential users.

## Walk-through

### 1. Installing Contentful SDK

Using Contenful in your application can be done using [the **Contentful** SDK available as an npm package](https://www.npmjs.com/package/contentful), which you can install using the following command:

```sh
npm install --save contenful
```

This SDK provides access to **Contentful**'s [Delivery AP](https://www.contentful.com/developers/docs/references/content-delivery-api/)I and [Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/), both of which will be used in the integration of **Contentful** in your app. 

First, you'll need **Contentful**'s access tokens, of which you'll need three. These can all be found in the Settings menu, under the `API keys` option:

- Space ID,
- Delivery token,
- Preview token;

Each token must be used together with their specific host, as follows:

- Delivery host: `cdn.contentful.com`,
- Preview host: `preview.contentful.com`;

Setting up the SDK can be done as follows: 

```js
import { createClient } from 'contentful';

const client = createClient({
    space: // Space ID token
    accessToken: // Either the Delivery token, or the Preview token
    host: // Either the Delivery host, or the Preview host
});
```

This `client` exposes the functions necessary to fetch the data in **Contentful**, for example:

```js
const result = await client.getEntries({ 
    content_type: 'clients',
});
```

If you're taking advantage of localization in your **Contentful** space, you must add to the request a field with your intended language code, like so:

```js
const result = client.getEntries({
    content_type: 'clients',
    locale: 'en-US'
});
```

### 2. Populating the app with fetched content

To populate the app with the fetched content, we will explore two possible implementations: one for bigger applications that justify the inclusion of Redux store, and those which don't.

#### 2.1. Accessing the client directly though `getInitialProps`

In Next.js apps, the `getInitialProps` function in general components typically receives a context object, which exposes many aspects of the context in which the page is rendered. Because we are building a custom app, and doing ourselves the work of running these `getInitialProps` functions, we can control what data they receive. In practice, we will be populating the context object with the information we want to propagate to our components. So, in your `App.js` file, you can check whether the page was loaded with a `cms-preview` query parameter, build your client, and share it across the app.

This function also has the advantage letting you return props to your App function, making it easier to signal the App itself if you're in preview mode.

```js
// App.js
import { createClient } from 'contentful';

App.getInitialProps = async ({Component, context, router}) => {

    // Create default client
    let client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN, // Delivery API Token
        host: 'cdn.contentful.com', // Delivery API host
    });

    // Check whether route has `cms-preview` query parameter
    const isPreviewingContentful = Object.hasOwnProperty.call(router.query, 'cms-preview');

    // Change client accordingly
    if (isPreviewingContentful) {
        client = createClient ({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN, // Preview API Token
            host: 'preview.contentful.com', // Preview API host
        });
    };
    
    // Append it to the context object so other Components can access it
    context.contentfulClient = client;

    let pageProps = {}

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(context);
    }
    
    // Return the state here to receive as a prop,
    // allowing you to conditionally render a DOM element in case of preview
    return { pageProps, isPreviewingContentful }
};
```

Afterwards, you can use the **Contentful** client in your component's `getInitialProps` to fetch content required for that component.

```js
// UseCases.js

UseCases.getInitialProps = async (context) => {

    const { contentfulClient } = context;

    // Fetch data from Contentful
    const entries = await contentfulClient.getEntries({
        content_type: 'useCase',
    });

    // Return result as props
    return { entries }
};
```

#### 2.2. Using Redux

When using Next.js, you can use [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) to integrate Redux in your application. We will be using this wrapper as part of this walkthrough, but will not cover its integration.  For more detailed information on this package, e.g. how to install it, please refer to its documentation.

As part of using this package, you'll have to create a function (which we'll call `buildStore` ) which should return the instance of the Redux store in your application, and it will be here that you will create your `client` instance, and decide whether it should fetch published or preview content. 

Given the nature of Next.js and the implementation of [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper), `buildStore` will run twice, once server-side and once client-side, requiring you to consistently instantiate the `client` to be the same for both cases. But the same strategy cannot be used for both. Each requires its own solution. 

In the following example we will be checking the presence of a `cms-preview` query parameter to decide whether to show preview content or the standard, published content, i.e. something like `www.example.com/?cms-preview`. 

```js
// buildStore.js
import { createClient } form 'contentful';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const buildStore = (initialState, { query }) => {
    
    // Instantiate standard client by default
    let client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN, // Delivery API Token
        host: 'cdn.contentful.com', // Delivery API host
    });

    if {
    // For server-side, check wether `query` exists and has the `cms-preview` key
    (typeof query !== 'undefined' && Object.hasOwnProperty.call(query, 'cms-preview')) ||
    // For client-side, check wether `window` exist and has the `cms-preview` query parameter
    (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('cms-preview')) {
        // In a positive case, switch the client instance to access the Preview API instead		
        client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN, // Preview API Token
            host: 'preview.contentful.com', // Preview API host
        });
    }

    const reducer = {
        // Example reducer
    };
    
    // Add client as a thunk middleware
    // This will give us access to the `client` object in our action functions as an argument
    const middlewares = applyMiddleware(thunkMiddleware.withExtraArgument({ client }));

    return createStore(reducer, initialState, middlewares);
    }
}

export default buildStore;
```

Then, in your actions scripts, you can use the provided client to fetch the content that you need, like so:

```js
// usecases/actions.js
// Create a fetch action that fetches data from Contentful
const fetch = () => async (dispatch, getState, { client }) => {
    dispatch({ type: 'Fetching'})

    try {
        // Fetch content that are instances of `useCase` content model, in Spanish
        const result = await client.getEntries({
            content_type: 'useCase',
            locale: 'es-ES',
        })

        // The incoming object will be fairly complex, and it's recommended to build
        // a more conveniently structured object here so that other scrips in the pipeline
        // can avoid handling that complexity and can instead enjoy a simpler, custom built object.
        // E.G.
        const entries = result.items
            .map((item)=> ({
                title: item.fields.title,
                description: item.fields.description,
                weight: item.fields.weight,
        })).sort((a, b) => b.weight - a.weight);

        dispatch({
            type: 'Success',
            payload: { entries },
        })
    } catch (error) {
        dispatch({
            type: 'Failure',
            payload: { error },
        });
    }
};
```

### 3. Conditionally rendering DOM elements in case of preview

Since we're on the topic, you must use a similar strategy in your `App.js` file to conditionally render a DOM element to let the user know they are in a preview state. This must happen once per instance of the App, since we will not perpetuate the `cms-preview` query parameter on route changes.

Class component:

```js
// App.js
class App extends Nextapp {
    state = {
        isPreviewingContentful = false,
    };

    // Using the componentWillMount() lifecycle function guarantees that this runs only once per instance of App
    componentWillMount() {
        const { router } = this.props;

        this.setState({
            isPreviewingContentful: Object.hasOwnProperty.call(router.query, 'cms-preview');
        });
    }

    render() {
        return (
            (...)
                { this.isPreviewingContentful && <ContentfulPreview> }
            (...)
        );
    }
}
```

Using hooks: 

```js
// App.js
const App = ({ Component, pageProps, rootSelector, router }) => {
    const [isPreviewingContentful, setIsPreviewingContentful] = useState(false);
    
    // Using a useEffect hook with no dependencies guaranties that it fires only once per instance of App
    useEffect(() => setIsPreviewingContentful(Object.hasOwnProperty.call(router.query, 'cms-preview')), [])

    return (
            (...)
                { this.isPreviewingContentful && <ContentfulPreview> }
            (...)
        )
}
```

### 4. CMS Translations

This boilerplate already includes **Internationalization** using [`@moxy/next-intl`](https://github.com/moxystudio/next-intl), this is done by staticaly configuring individual `intl/messages/<locale>.json` per locale. You can do this dynamically by moving this static files to a **Contentful** content model and by enabling localization in it.

#### 1. Defining the content type

Firstly define the content type that will consist on a list of key/value pairs. Add the fields necessary to fit your needs, for example `homePageTitle`.

> ℹ️ Make sure that you enable localization on every field you set in your content type.

After creating your content type populate the respective fields accordingly.

#### 2. Overriding [`@moxy/next-intl`](https://github.com/moxystudio/next-intl)

Now that you have your content type set you should update the `/intl/index.js` file to fetch the data from **Contentful**. This is done by using the [**Contentful** SDK](https://www.npmjs.com/package/contentful).

```js
locales: [
    {
        id: 'en-US',
        name: 'English',
        loadMessages: async () => {
            const content = await client.getEntries({
                content_type: 'genericTranslations',
                locale: 'en-US',
                // The parameter bellow is needed to avoid the problem described at the top of the file.
            });

            return content.items[0].fields; melhorar isto
        },
    },
],
```

## Cache

### 1. Contentful API rate limits

API Rate limits specify the number of requests a client can make to Contentful APIs in a specific time frame. Every request counts against a per second rate limit.

Currently Conentful doesn't enforce any limits on requests that hit their CDN cache. For requests that do hit the Content Delivery API enforces rate limits of 78 requests per second.

When a client gets rate limited, the API responds with the `429 Too Many Requests` status code and sets the `X-Contentful-RateLimit-Reset` header that tells the client when it can make its next request. 

### 2. Custom Caching Layer
