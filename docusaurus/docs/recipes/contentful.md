---
id: contentful
title: Implementing Contentful
sidebar_label: Contentful
---

This recipe aims to guide you through the implementation of Contentful in the project and also provides custom solutions for different use-cases.  

### What is a CMS?

A CMS, or Content Management System, is a platform that helps in the creation and management of content to be consumed in a web application. In short, these services provide a database and a database management system with a layer of usability on top that makes them inclusive to users without technical expertise.

### Contentful

[Contentful](https://www.contentful.com/) is one such CMS, and the object of this recipe.

For more information about **Contentful**'s API please [refer to their documentation](https://www.contentful.com/developers/docs/).

## Modeling the schema

As a developer working on the App that will consume the content stored in the CMS, you're also responsible for creating and modeling the schema itself. This will mean creating new content models that must be usable by the client team which will eventually handle **Contentful** after the hand off of the project. One **major** consideration to have is the usability and readability of the content models you're creating. Remember that they are meant to be usable without any previous technical knowledge of this context. 

**Contentful** offers many options for type validations, input appearance and descriptions to help the users understand what kind of input is expected. You should use all of them to minimize the chance of users not understanding what's expected of them, in what ways they are limited, reducing the chances of unexpected content in your application.

Keep in mind:

→ Always use appropriate types when possible,

→ Use validations where appropriate to make sure the input values are what the developer expects,

→ Use meaningful titles and descriptions to ensure the user knows what's expected of that field.

## Localization

**Contentful** makes it easy to add localized content to your application. Once you define a locale, which you can do in the Locales option in the Settings menu, you can specify in each field you create whether they can be localized, in what languages, etc., giving you fine control over what needs to be localized and what doesn't. 

Once having these locales, you can then use the **Contentful** API signaling your desired locale through the `locale` field. You'll find an example of this in the next section.

## Preview

Contentful splits content changes in 3 states:

- `Published`: when a user saves some content.
- `Changed`: when the user changes previously saved content but still hasn't saved the new one.
- `Draft`: when the user creates new content but doesn't save.
  
Usually, only `Published` content is available, unless a specific request is done. This request is called `Preview` and may help users see beforehand how content would look like on their website before publishing it and making it available for every visitor.

However, Contentful **does not validate content that is not published.** This means that, if your app relies on validation from Contentful, **it will likely break in preview mode unless all content in Contentful already passes validation.** This is assumed and must taken into account when developing your applications and communicated to potential users.

## Walk-through

### 1. Installing Contentful SDK

Using Contentful in your application can be done using [the **Contentful** SDK available as an npm package](https://www.npmjs.com/package/contentful), which you can install using the following command:

```sh
npm install --save contentful
```

This SDK provides access to **Contentful**'s [Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) and [Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/), both of which will be used in the integration of **Contentful** in your app. 

First, you'll need two **Contentful** access tokens and a space identifier. All three can be found in the Settings menu, under the `API keys` option:

- Space ID,
- Delivery token,
- Preview token;

Each token must be used together with their specific host, as follows:

- Delivery host: `cdn.contentful.com`,
- Preview host: `preview.contentful.com`;

After obtaining the **Contentful** access tokens, you need to [set these environment variables](/docs/what-is-included/environment-variables#adding-a-new-environment-variable):

```
CONTENTFUL_SPACE_ID=<SPACE_ID>
CONTENTFUL_TOKEN=<DELIVERY_TOKEN>
CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_TOKEN>
```

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
const result = await client.getEntries({
    content_type: 'clients',
    locale: 'en-US'
});
```

In the contents you are retrieving, you may have links to other contents. In this case, you will have to decide if you want the SDK to resolve those links for you. This way, instead of a content link being returned in the `includes` property of the response, the actual content will be placed in the field where the linked entry metadata would be.

You can change the depth to which links will be resolved with the option `include`. By default it is set at `1`, and its maximum value is `10`. Please consider that a higher `include` value will introduce more complexity to the resolver and may result in a loss of performance.

```js
const result = await client.getEntries({ 
    content_type: 'clients',
    include: 0,
});
```

### 2. Populating the app with fetched content

To populate the app with the fetched content, we will explore two possible implementations: one for bigger applications that justify the inclusion of a Redux store, and another which doesn't.

#### 2.1. Accessing the client directly though `getInitialProps`

In Next.js apps, the `getInitialProps` function in general components typically receives a context object, which exposes many aspects of the context in which the page is rendered. Because we are building a custom app, and doing the work of running these `getInitialProps` functions ourselves, we can control what data they receive. In practice, we will be populating the context object with the information we want to propagate to our components. So, in your `App.js` file, you can check whether the page was loaded with a `cms-preview` query parameter, build your client, and share it across the app.

This function also has the advantage of letting you return props to your App function, making it easier to signal the App itself if you're in preview mode.

```js
// www/app/App.js
import { createClient } from 'contentful';

App.getInitialProps = async ({Component, context, router}) => {
    // Check whether route has `cms-preview` query parameter
    const isPreviewingContentful = Object.hasOwnProperty.call(router.query, 'cms-preview');

    // Set the preview or regular host
    const contentfulHost = isPreviewingContentful ? 'preview.contentful.com' : 'cdn.contentful.com';

    // Create client with correct host
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN, // Delivery API Token
        host: contentfulHost, // Delivery API host
    });
    
    // Append it to the context object so other Components can access it
    context.contentfulClient = client;

    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(context);
    }
    
    // Return the state here to receive as a prop,
    // allowing you to conditionally render a DOM element in case of preview
    return { pageProps, isPreviewingContentful };
};
```

Afterwards, you can use the **Contentful** client in your component's `getInitialProps` to fetch content required for that component.

```js
// www/pages/use-cases/UseCases.js

UseCases.getInitialProps = async (context) => {
    const { contentfulClient } = context;

    // Fetch data from Contentful
    const entries = await contentfulClient.getEntries({
        content_type: 'useCase',
    });

    // Return result as props
    return { entries };
};
```

#### 2.2. Using Redux

When using Next.js, you can use [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) to integrate Redux in your application. We will be using this wrapper as part of this walkthrough, but will not cover its integration.  For more detailed information on this package, e.g. how to install it, please refer to its documentation.

As part of using this package, you'll have to create a function (which we'll call `buildStore` ) which should return the instance of the Redux store in your application, and it will be here that you will create your `client` instance, and decide whether it should fetch published or preview content. 

Given the nature of Next.js and the implementation of [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper), `buildStore` will run twice, once server-side and once client-side, requiring you to consistently instantiate the `client` to be the same for both cases. But the same strategy cannot be used for both. Each requires its own solution. 

In the following example we will be checking the presence of a `cms-preview` query parameter to decide whether to show preview content or the standard, published content, i.e. something like `www.example.com/?cms-preview`. 

```js
// www/shared/redux/buildStore.js
import { createClient } from 'contentful';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const buildStore = (initialState, { query }) => {
    // Instantiate standard client by default
    let client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_TOKEN, // Delivery API Token
        host: 'cdn.contentful.com', // Delivery API host
    });

    if (
        // For server-side, check wether `query` exists and has the `cms-preview` key
        (typeof query !== 'undefined' && Object.hasOwnProperty.call(query, 'cms-preview')) ||
        // For client-side, check wether `window` exist and has the `cms-preview` query parameter
        (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('cms-preview'))
    ) {
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
    // This will give us access to the `client` object in our fetcher functions as an argument
    const middlewares = applyMiddleware(thunkMiddleware.withExtraArgument({ client }));

    return createStore(reducer, initialState, middlewares);
}

export default buildStore;
```

Then, in your actions scripts, you can use the provided client to fetch the content that you need, like so:

```js
// www/shared/redux/usecases/actions.js
// Create a fetch action that fetches data from Contentful
const fetch = () => async (dispatch, getState, { client }) => {
    dispatch({ type: 'Fetching' });

    try {
        // Fetch content that are instances of `useCase` content model, in Spanish
        const result = await client.getEntries({
            content_type: 'useCase',
            locale: 'es-ES',
        });

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
        });
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

As an example, we show how to conditionally render `ContentfulPreview`, which is a component that consists in a ribbon that is placed on the page to indicate the user is viewing a preview version of the content.

Using hooks: 

```js
// www/app/App.js
const App = ({ Component, pageProps, rootSelector, router }) => {
    const [isPreviewingContentful, setIsPreviewingContentful] = useState(false);
    
    // Using a useEffect hook with no dependencies guaranties that it fires only once per instance of App
    useEffect(() => setIsPreviewingContentful(Object.hasOwnProperty.call(router.query, 'cms-preview')), []);

    return (
        (...)
            { isPreviewingContentful && <ContentfulPreview /> }
        (...)
    );
}
```

Class component:

```js
// www/app/App.js
class App extends NextApp {
    state = {
        isPreviewingContentful: false,
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
                { this.isPreviewingContentful && <ContentfulPreview /> }
            (...)
        );
    }
}
```

### 4. CMS Translations

This boilerplate already includes **Internationalization** using [`@moxy/next-intl`](https://github.com/moxystudio/next-intl), this is done by statically configuring individual `intl/messages/<locale>.json` per locale. You can do this dynamically by moving this static files to a **Contentful** content model and by enabling localization in it.

#### 1. Defining the content type

Firstly, define the content type that will consist on a list of key/value pairs. Add the fields necessary to fit your needs, for example `homePageTitle`.

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

            return content.items[0].fields;
        },
    },
],
```

## Cache

### 1. Contentful API rate limits

API Rate limits specify the maximum number of requests a client can make to Contentful APIs in a specific time frame. Every request counts against a per second rate limit.

Currently, Contentful doesn't enforce any limits on requests that hit their CDN cache. For requests that do hit the Content Delivery API enforces rate limits of 78 requests per second.

When a client gets rate limited, the API responds with the `429 Too Many Requests` status code and sets the `X-Contentful-RateLimit-Reset` header that tells the client when it can make its next request. 

### 2. Custom Caching Layer

One preventive measure to avoid hitting the rate limit for Contentful is to implement your own custom caching layer.
This can be done by setting up a proxy server which will add an `s-maxage` HTTP header into the Contentful's response.

This header will then be interpreted by the _CDN_ that is delivering the application (for example _CloudFlare_), which will cache the response and avoid repeating the same request to Contentful during a specified time interval.

The first thing you'll need in order to implement this solution is to install [http-proxy](https://www.npmjs.com/package/http-proxy):

```sh
$ npm i http-proxy
```

Then, you'll want to create an endpoint in your application which will serve as a proxy for all the requests directed at Contentful's API.

For this, you'll have to create the file `pages/api/cms/[...cms].js`. This file/directory structure and naming is important because you'll want to receive any requests directed to `<hostname>/api/cms/*`.

This endpoint will create the `proxy` server and, on each request, remove `/api/cms` from the request, rewrite the `host` header to the correct host (`cdn.contentful.com`), redirect the request to `cdn.contentful.com` and set the `Cache-Control` HTTP header of the response to `s-maxage=60`.

```js
// pages/api/cms/[...cms].js
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});

export default (req, res) => {
    req.url = req.url.replace('/api/cms', '');
    req.headers.host = 'cdn.contentful.com';

    proxy.web(req, res, {
        target: {
            host: 'cdn.contentful.com',
        },
    });

    if (req.method === 'GET') {
        res.setHeader('Cache-Control', 's-maxage=60');
    }
};
```

Finally, you will need to setup the Contentful client to direct it's requests to the endpoint you just configured. Please note that you only want to cache the requests when in a production environment.

```js
const clientOptions = {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_TOKEN,
};

if (process.env.NODE_ENV === 'production') {
    clientOptions.host = process.env.SITE_URL;
    clientOptions.basePath = '/api/contentful';
}

const client = createClient(clientOptions);
```

**NOTES:**

> ℹ️ You have to be able to access to `process.env.NODE_ENV` from the client side as well as the server side, to proxy client side requests to Contentful in production environments.

> ℹ️ The `process.env.SITE_URL` variable has to be correctly configured and accessible from both server and client side, otherwise the request to the proxy endpoint will not happen correctly. This may mean that preview url's in merge request will not function correctly, which will happen if the application is started with `process.env.NODE_ENV` set to `production`.

## Custom SEO

There may be cases where you will want to configure custom SEO per page. Unfortunately, Contentful does not provide out-of-the-box SEO support, so you will need to implement your own strategy. The approach we suggest is the following:

- Create a content model for SEO.
- Add a field `Title` that should be only used to identify the model, e.g. "Homepage SEO".
- Add a SEO field (json) to the model. Here, the SEO related tags (title, meta, etc.) will be defined in a _json_ format like so:

```json
{
    "meta": [
        {
            "name": "description",
            "content":"MyPage Description",
        },
        {
            "property": "og:title",
            "content": "MyPage Title",
        },
        {
            "property": "og:image",
            "content": {
                "id": "6fU8dkL1P9eZlPE9JPw89n"
            }
        }
    ],
}
```

- Add a SEO Assets field (many file, media input) to the model.
- Create a link field type in the models you need SEO and link it to the model you just created.

The resulting content model should look like this.

![SEO Content Model](../../static/img/SEO%20content%20model.png)

In order to obtain the `id` used for meta tags whose content is an asset, you need to select the asset entry and, on the right side panel of the asset, select **Info** and copy the **id**. Later in the application you'll use this **id** to generate the URL for the asset.

On the application itself, the steps to customize the SEO are the following:

- Define a _default_ SEO data.
- Render the _default_ SEO data in the `App.js` file using [@moxy/next-seo](https://www.npmjs.com/package/@moxy/next-seo) (outside the `Head` tag).
- Fetch page data as you normally would.
- Obtain the SEO data from the Contentful page data (example code for the Contentful SEO _parser_)

```js
// www/shared/utils/seo-parser/seoParser.js
import { mapValues, isPlainObject } from 'lodash';

// This function will determine if a meta entry's content is an id
// If it is, it obtains the url to the asset that matches the id
// Otherwise it returns the content 

const getContent = (content, assets) => {
    if (isPlainObject(content)) {
        const asset = assets.find(({ sys }) => sys.id === content.id);

        return asset.fields.file.url.slice(2);
    }

    return content;
};

// Provided with the result from the Contentful API call and the correct SEO entry,
// This function will extract the SEO data, and complete it with the URL of any needed asset.

const parseContentfulSEO = (seoEntry) => {
    let seoContent;

    try {
        seoContent = JSON.parse(seoEntry.fields.seo);
    } catch (parsingError) {
        console.err('Unvalid JSON in SEO content');
        console.err(parsingError);
        return;
    }

    // Convert every content: { id: ''} into a content: url, keep unchanged otherwise
    const content = {
        title: seoContent.fields.title,
        meta: seoContent.meta.map((entry) => mapValues(entry, (value) => getContent(value, seoContent.fields.seoAssets))),
        link: seoContent.link.map((entry) => mapValues(entry, (value) => getContent(value, seoContent.fields.seoAssets))),
    }

    return content;
}

export default parseContentfulSEO;
```

- Render the SEO data (title and tags) in the `App.js` file using [@moxy/next-seo](https://www.npmjs.com/package/@moxy/next-seo) (outside the `Head` tag).

We use this module for the rendering of meta tags as it takes care of two concerns:

- Discards any repeated meta tags.
- Renders any `title`, `meta` and `link` tags inside an `Head` tag.

