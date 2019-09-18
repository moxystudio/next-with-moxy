# Automatic Prerendering

Next.js automatically determines that a page is static (can be prerendered) if it has no blocking data requirements.

## How to use

The determination of automatic prerendering is based on the absence of `getInitialProps` in the page. For that reason we can enable or disable based on the project's needs.

### Disable

> ⚠️ **Boilerplate Default**

If `getInitialProps` is present, Next.js will not prerender the page.
Instead, Next.js will use its default behavior and render the page on-demand, per-request (meaning Server-Side Rendering).

#### What to do

To disable automatic prerendering in the boilerplate some changes need to be done. This may only be needed if it was enabled previously since it's already disabled by default.

Change the following file [`src/app/App.js`](../../boilerplate/src/app/App.js) and include `getInitialProps`:

```js
class App extends BaseApp {
	...
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }
    ...
}
```

### Enable

If `getInitialProps` is absent, Next.js will **statically optimize** your page automatically by prerendering it to static HTML. During prerendering, the router's `query` object will be empty since we do not have `query` information to provide during this phase. Any `query` values will be populated client side after hydration.

This feature allows Next.js to emit hybrid applications that contain **both server-rendered and statically generated pages**.
This ensures Next.js always emits applications that are **fast by default**.

This feature provides many benefits.
For example, optimized pages require no server-side computation and can be instantly streamed to the end-user from CDN locations.

The result is an _ultra fast_ loading experience for your users.

`next build` will emit `.html` files for statically optimized pages.

The result will be a file named:

`.next/server/static/${BUILD_ID}/about.html`

instead of:

 `.next/server/static/${BUILD_ID}/about.js`.

This behavior is similar for `target: 'serverless'`

#### What to do

To enable automatic prerendering in the boilerplate some changes need to be done.

Change the following file [`src/app/App.js`](../../boilerplate/src/app/App.js) and remove `getInitialProps`

## Notes

> If you have a [custom `<App>`](#custom-app) with `getInitialProps` then automatic prerendering will be disabled for all pages.
