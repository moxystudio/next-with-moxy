---
id: dato-cms
title: Integrating DatoCMS
sidebar_label: DatoCMS
---

Often there is a need to have a **Content Management System (CMS)** to manage all the website content in a easy way for non tech people.
In this recipe you will be guided on how to setup and integrate **DatoCMS**.

## Walk-through

### 1. Content modeling

This is an important part of this recipe. All the models should be user friendly as they are often used by people with less technical knowledge. In **DatoCMS**, after creating a project, you can create new models in "Settings" > "Models".

When creating a new model you should:

- Choose a descriptive and user friendly name;
- ❗️ Select the option **"Enable draft/published system?"** in the **"Additional Settings"** tab. **DatoCMS** doesn't have draft models by default;
- Check the rest of the additional settings that you might need - e.g. collection order, visualization mode, required content in all languages.

When creating a new field type for your models you should:

- Choose a descriptive and user friendly name;
- Select the option "Enable localization on this field?" in case you want it to be translatable;
- Add all the necessary validations - e.g. mark the field as required or unique, limit the number of records;
- Add an "Help text" in the "Presentation" tab giving more information about the field.

> ⚠️ You should avoid using JSON field types as they are not user friendly.

### 2. How to include DatoCMS in your App

First you need to get your **API token**, you can find it in **DatoCMS** under "Settings" > "API tokens". Then you need to [add a new environment variable](/docs/what-is-included/environment-variables#adding-a-new-environment-variable) called `DATOCMS_TOKEN` with the token.

After that you need a **GraphQL client** to access the Content Delivery API - `https://graphql.datocms.com`.
For this recipe we will use **Apollo** but feel free to use other alternatives.

You will need the following packages:

```sh
npm i next-with-apollo @apollo/client @apollo/react-hooks apollo-client graphql
```

Then copy the files inside [next-with-apollo](https://github.com/moxystudio/next-with-moxy/tree/master/docusaurus/static/recipes-assets/dato-cms/next-with-apollo) into `www/shared/modules/next-with-apollo`.

The [apollo client](https://github.com/moxystudio/next-with-moxy/tree/master/docusaurus/static/recipes-assets/dato-cms/next-with-apollo/apollo-client.js) is already configured with the Content Delivery API endpoint and the respective authorization header using the variable `DATOCMS_TOKEN`, so you don't need to do any changes.

Now let's use it! 🚀  
All you need to do is wrap your pages with the HOC. Using the page `Home` as example you would need to do the following:

```js
// ...
import { withApollo } from '../../shared/modules/next-with-apollo';

//...

export default withApollo(Home);
```

Now you can access `apolloClient` in your `getInitialProps` to fetch data:

```js
// ...
import gql from 'graphql-tag';

const GET_DATA = gql`
    {
        homePage {
            title
            description
        }
    }
`;

const Home = ({ data }) => (
    <div className={ styles.home }>
        <h1>{ data.title }</h1>
    </div>
);

Home.getInitialProps = async ({ apolloClient }) => {
    const result = await apolloClient.query({ query: GET_DATA });

    const { title, description } = result.data.homePage;

    return {
        data: {
            title,
            description,
        },
    };
};
```

> ℹ️This is a simple example with a short query, but the queries can get really long. If that happens you should move them out of the component into a separate file.

> ⚠️ The Content Delivery API doesn't allow mutations, which means that you can't create, update or delete content. If you need that you should use the Content Management API that uses REST.

### 3. Localization

**DatoCMS** provides an easy way to localize your content. You can manage the supported languages on **"Project settings"**.  

To force a model to be localized in all languages you need to select the option **"All locales required?"** on its settings.  
For each field type if you need it to be translatable you have to select the option **"Enable localization on this field?"** on its settings.

> ⚠️ Be aware that DatoCMS doesn't have locale fallback. When the content doesn't exist in one language it will show empty.

So using the **Content Delivery API** you can filter the content for a specific locale in different ways.

- Query based:

```
homePage(locale: pt) {
    title
    description
}
```

- Field based:

```
homePage {
    title(locale: pt)
    description(locale: pt)
}
```

You can also get the content in all locales. To do that you need to use a special field like the following example:

```
homePage {
    _allTitleLocales {
        locale
        value
    }
    _allDescriptionLocales {
        locale
        value
    }
}
```

For the examples above we are using a fixed locale but ideally you want the locale as an argument to the query. To do that you need to edit the query:

```
query Project($locale: SiteLocale) {
    project(locale: $locale) {
        title
    }
}
```

When using the query you need to pass the locale as a variable:

```js
// Home.js
Home.getInitialProps = async ({ apolloClient }) => {
    const result = await apolloClient.query({
        query: GET_DATA,
        variables: {
            locale: 'en_US'
        }
    };

    const { title, description } = result.data.homePage;

    return {
        data: {
            title,
            description,
        },
    };
};
```

> ❗ The Content Delivery API uses underscore instead of dash for locales. As you can see in the example we used `en_US`, and not `en-US`.

#### Static translations

This boilerplate already includes **Internationalization** using [`@moxy/next-intl`](https://github.com/moxystudio/next-intl), that is done by configuring individual `intl/messages/<locale>.json` per locale. This is hard to maintain as it is necessary a new deploy to add or edit translations.  
To overcome this problem we can add the static translations to **DatoCMS**, so it is easier to manage it.

1. Create a new model called "Translation". Select the option "Single instance?" and "All locales required?";
2. Create a "Modular Content" field type called "Entries";
3. Add a new block called "Entry" and select "Enable localization on this field?";
4. Add 3 text fields to the block. The order is important, the first field will identify the block, so you should follow this order:
   - Description (required) - brief description of the field, for example "Homepage Title";
   - Key - used on the code to get the translation, for example `home.title`;
   - Value - value of the translation.

> ℹ️**DatoCMS** has a "Hidden Field" plugin that can be useful here to hide the `key` field. This will prevent changes on that field.  
To do so you need to add the plugin, then go to the field's settings and change the "Field editor" to "Hidden Field", on "Presentation" tab. This will hide the field and every time there is a need to change it you have to change the "Field editor" back to "Default editor".

Now we need to get the translations!  
First it is necessary to export the `createApolloClient` function in the `www/shared/modules/next-with-apollo/index.js` file:

```js
// ...
export { default as createApolloClient } from './apollo-client';
```

Then use it and get the translations in the `intl/index.js` file:

```js
// ...
import gql from 'graphql-tag';
import { createApolloClient } from '../www/shared/modules/next-with-apollo';

const apolloClient = createApolloClient(null, null);

const GET_TRANSLATIONS = gql`
    query Translations($locale: SiteLocale) {
        translation(locale: $locale) {
            entries {
                key
                value
            }
        }
    }
`;

export default {
    locales: [
        {
            id: 'en-US',
            name: 'English',
            loadMessages: async () => {
                const result = await apolloClient.query({
                    query: GET_TRANSLATIONS,
                    variables: {
                        locale: 'en_US',
                    },
                });

                const { translation } = result.data;

                return translation.entries.reduce((map, obj) => {
                    map[obj.key] = obj.value;

                    return map;
                }, {});
            },
        },
    ],
    // ...
};
```

And it's all set! You can now get the translations from **DatoCMS**.

### 4. Preview content

In order to have draft content you have to select the **"Enable draft/published system?"** option when creating a model.  
To access the draft content **DatoCMS** provides a different endpoint for that - `https://graphql.datocms.com/preview` - although the API token remains the same.

The `withApollo` HOC already has support for the preview mode but it assumes that the query string for preview is `cms-preview`. If you need it to be something else feel free to change it.

If you need to do conditional rendering for the preview mode, you can do the following:

```js
// App.js
export const App = ({ Component, pageProps, router }) => {
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => setIsPreview(Object.hasOwnProperty.call(router.query, 'cms-preview')), []);

    // ...

    return (
        (...)
            { isPreview &&
                <div>
                    DatoCMS Preview
                </div>
            }
        (...)
    );
};
```

As a last step, **DatoCMS** lets you customize the sidebar menu, so you should add a new menu item pointing to the preview URL of your website. The option to add the menu item is at the bottom of the sidebar.

### 5. Caching

When it comes to cache it gets a little tricky because **GraphQL APIs use POST requests**, and so does the Delivery Content API. To overcome this problem it is necessary the use of **Automatic Persisted Queries (APQ)** that let you use **GET requests** instead of POST requests.  

To do that we need to create an API route with our server connecting to **DatoCMS** and implement a **Reverse Proxy**. Then change the client to consume the new endpoint using APQ.

The next steps show you how to setup an Apollo Server on the API route - we will use `api/graphql` - and change the Apollo Client to use that new endpoint with APQ.

- Install the following packages:

```sh
npm i apollo-server apollo-server-micro apollo-link-context apollo-link-persisted-queries
```

- Copy [graphql.js](https://github.com/moxystudio/next-with-moxy/tree/master/docusaurus/static/recipes-assets/dato-cms/graphql) file into the `/api` folder;

- Map `/api/graphql.js` to `/pages/api/graphql.js` and disable the default `bodyParser`:

```js
// /pages/api/graphql.js
export const config = {
    api: {
        bodyParser: false,
    },
};

export { default } from '../../api/graphql';
```

Your server is ready, you can access http://localhost:3000/api/grahpql and try it!

Now you need to change the Apollo Client to consume this new endpoint with APQ:

```js
// shared/modules/with-apollo/apolloClient.js
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
//...

export default function createApolloClient(initialState, ctx, preview = false) {
    // ...
    const link = preview ?
        new HttpLink({
            uri: 'https://graphql.datocms.com/preview',
            credentials: 'same-origin',
            fetch,
            headers: {
                Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`,
            },
        }) :
        createPersistedQueryLink({ useGETForHashedQueries: true }).concat(new HttpLink({
            uri: `${process.env.SITE_URL}/api/graphql`,
            credentials: 'same-origin',
            fetch,
        }));

    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link,
        cache: new InMemoryCache().restore(initialState),
    });
}
```

> ℹ️For the preview it is recommended to use directly the Content Delivery API, so when someone changes the content on **DatoCMS** they can see it immediately.

Last step is to add cache control headers. Apollo Server has a `cacheControl` option that you can use if you want to use normal cache:

```js
// api/graphql.js

const apolloServer = new ApolloServer({
    // ...
    cacheControl: {
        defaultMaxAge: 60,
        calculateHttpHeaders: process.env.NODE_ENV === 'production',
    },
});
```

This will return `Cache-control: max-age=60, public` in the response headers.

If you just want to use shared cache it is necessary to change the response headers and include the `s-maxage`:

```js
// api/graphql.js

const apolloServer = new ApolloServer({
    // ...
    context({ res }) {
        if (process.env.NODE_ENV === 'production') {
            res.setHeader('Cache-control', 's-maxage=60');
        }
    },
});
```

Finally you just add configuration to your CDN and make it cache the `/api/graphql` request.

### 6. Dynamic SEO

**DatoCMS** provides global SEO settings for your website as well as a SEO field type that you can add to your models.  
This can be useful if you want to have different SEO for different pages and easily manage it.

If you want a basic solution for your SEO you can use the SEO field type directly in your models. This field lets you manage the:

- Title - used for `<title>`, `og:title` and `twitter:title`;
- Description - used for `description`, `og:description` and `twitter:description`;
- Image - used for `twitter:image` and `og:image`;

You can access it on the API using the `_seoMetaTags` field:

```
query MyQuery {
  homepage {
    _seoMetaTags {
        attributes
        content
        tag
    }
  }
}
```

It will return an array like this:

```json
[
    {
        "attributes": null,
        "content": "Title",
        "tag": "title"
    },
    {
        "attributes": {
            "property": "og:title",
            "content": "Title"
        },
        "content": null,
        "tag": "meta"
    },
    ...
]
```

The tags supported by this field are:

- The `<title>` tag;
- The meta tags `og:title`, `twitter:title`, `description`, `og:description`, `twitter:description`, `og:image`, `og:image:width`, `og:image:height`, `twitter:image`, `og:locale`, `og:type`, `article:modified_time` and `twitter:card`.

This is a basic solution and limits what you can work with because there is no way to edit or add fields.

The solution **we recommend** is the following:

- Create a model for SEO;
- Add a field "Title" that should be only used to identify the model, e.g. "Homepage SEO";
- Add a SEO field type - you can set specific some fields as required;
- Create a `link` field type in the models you need SEO and link it to the model you just created.

This solution works just fine as the basic one but it has a detail, you have to access the `_seoMetaTags` field of your SEO model. So, assuming you have a `Homepage` model and you added a link to the SEO model called `SEO`, your query would look like this:

```
query MyQuery {
  homepage {
    seo {
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
}
```

This solution has a lot of benefits:

- If you need more fields you just add it to the SEO model instead of having to add it to all your models;
- If you need to have more meta tags you can create a JSON field type and use a similar structure to the one the API returns;
- You can use the same SEO for multiple models;

Now you just need to integrate it in your pages. We will show you an example on how to do it using the `Home` page.  
This boilerplate uses [`next-seo`](https://github.com/moxystudio/next-seo) to manage SEO, so we will use that.

First you need to import the `Seo` component in your page and change your query to get the SEO information from **DatoCMS**, just like we showed you previously.

Once you have the SEO information we suggest using the following parser:

```js
export const parseDatoSeo = ({ metaTags }) => {
    const title = metaTags.find((meta) => meta.tag === 'title').content;
    const meta = metaTags.filter((meta) => meta.tag === 'meta').map((meta) => meta.attributes);

    return {
        title,
        meta,
    };
};

export default parseDatoSeo;
```

This parser takes the `_seoMetaTags` array and returns an array with the correct structure that you can pass to the `Seo` component.

**Note**: Keep in mind that the parser only has support for the `_seoMetaTags` field. In case you have extra fields for custom meta tags, for example, you should merge the result from the parser with the extra fields according to the [`next-seo` structure](https://github.com/moxystudio/next-seo#api).
