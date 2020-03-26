---
id: analytics
title: Analytics and cookie consents
sidebar_label: Analytics and cookie consents
---

Being able to evaluate how your audience interacts with your website is crucial in order to understand if the content you are creating is getting to them the way it's intended to. Also, wouldn't it be good to know how did said audience get to your website? Was it through a Google search? Facebook post, maybe? Is your investment in digital marketing being worthwhile? With all these topics in mind, an analytics solution was integrated into this boilerplate, allowing for easy data collection about how users interact with your application, ultimately giving you a sense of how well your website is performing, as well as how effective your digital marketing strategies are at any given moment.

## Google Tag Manager

The analytics solution we employed is based on [Google Tag Manager](https://tagmanager.google.com/) (`GTM`), which has huge advantages in terms of ease of implementation, as it offers a lot of tracking features that can be integrated out of the box into your website without the need to interfere with the code. Anyone can start implementing tags and make the most of `GTM`, provided they learn how it works.

> ℹ️ It's recommended that you have a [Google Analytics](https://analytics.google.com/analytics/web/) (`GA`) account setup properly prior to start collecting data with `GTM`. It would also allow you to properly benefit from the use of `Urchin Tracking Module` (`UTM`) in your URLs (we will talk about this in a moment). If you haven't already setup your `GA` account, check the `Get Started With Analytics` section of the official [documentation](https://support.google.com/analytics/answer/1008015). Nevertheless, if you think `GA` won't fill your needs, fear not, as `GTM` supports a whole array of different tags and marketing pixels. Check a list of them all [here](https://support.google.com/tagmanager/answer/6106924), if you'd like.

In order to start collecting data with `GTM`, start by creating a new account and container, as stated in the official [documentation](https://support.google.com/tagmanager/answer/6103696). After that, would you kindly get the container id, which should look similar to `GTM-XXXXXXX` and set it to the `GTM_CONTAINER_ID` in the environment variable. Okay, that's it. You're ready to collect valuable information about your website. To test if you set up things correctly, use the [Preview](https://support.google.com/tagmanager/answer/6107056) feature of `GTM`. If a container appears at the bottom of your page when you run your app, it means that the setup was done properly and you can start creating your tags. Sometimes you may need to hard refresh your browser for it to appear, though.

Note that you can start developing your application as usual without having `GTM` set up from the start. If there is not a `GTM_CONTAINER_ID` set in the environment variable, the module simply won't be initialized and everything will run smoothly. Refer to [`Removing this feature`](#removing-this-feature) at the end of this guide for an easy way to remove this feature if you don't need it at all.

As stated before, one of the most common examples of an event to track would be page views, namely with `GA`. To do this, deploy GA with Tag Manager, as explained [here](https://support.google.com/tagmanager/answer/6107124). Note that for correctly tracking page views in an application built with Next.js, you need to take into account that the router uses HTML5 push. As in, route changing happens without the page actually being refreshed. It is of the utmost importance that you properly configure the [`History Change Trigger`](https://support.google.com/tagmanager/answer/7679322).

It may be the case that you need to collect some more complex data for some more complex tags. For that, you're probably going to want to use the [Data Layer](https://developers.google.com/tag-manager/devguide). The utility module available in `www/shared/utils/google-tag-manager` has a `dataLayer` function that you can use in your components. An example would be a blog post page, where developers would inject blog related data such as its ID, title, author and date, and then marketeers can pick this data to populate events in `GTM`:

```js
import { dataLayer } from './shared/utils/google-tag-manager';

const Blog = ({ blog }) => {
    useEffect(() => {
        dataLayer({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            date: blog.date
        });
    }, [blog]);

    return (
        <div>{ /* ... */ }</div>
    );
};
```

## Urchin Tracking Module

`UTM's` are parameters put in external urls that will help understand where did the redirect to your website come from. These are especially helpful for determining the effectiveness of marketing campaigns. Usually, you would use the official [`Campaign URL Builder`](https://ga-dev-tools.appspot.com/campaign-url-builder/) . But then, your URL would look something like this: `https://www.example.com/?utm_source=youtube&utm_medium=video&utm_campaign=winter_sale&utm_term=shirt`. A little bit ugly of a URL, isn't it? Well, `GTM` lets you make prettier URLs that collect the exact same data. We strongly recommend taking the approach described in this very detailed [article](https://www.getelevar.com/how-to/hide-google-utm-parameters-from-url/). Using this, your url would instead look something like `https://www.example.com/#youtube` and allow you to have the same valuable data provided by the `UTM's`, if setup properly. Go check it out your GA dashboard, in Real Time > Traffic Sources. The medium and sources you setup in GTM should be there. If not, `(none)` and `(direct)` will appear for each, respectively, and you need to take another look at the article to figure out what you did wrong.

## Prompting for consent

For privacy purposes, and in compliance with [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) and other regulations, apps need to ask the user for permission to collect user data. The boilerplate comes with a `<CookieBanner />` component that allows exactly this. It prompts the user to consent the use of Cookies, namely for analytics, and saves the preference for 365 days.

## Removing this feature

If you are sure you do not need analytics in your project, you can remove all the analytics related code. To do so, take the following steps:

1. Uninstall `react-cookies` if no other component uses it.
2. Remove the `<CookieBanner />` component and its associated components.
3. Delete the `www/shared/utils/google-tag-manager` module. Also, make sure to cleanup the files where it was being used, such as the `<App />` component. The global search feature of your editor will be your best friend here.
4. Update your unit tests if necessary so that they all pass!
