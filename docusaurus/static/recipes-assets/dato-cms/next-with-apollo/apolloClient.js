import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import fetch from 'isomorphic-unfetch';

export default function createApolloClient(initialState, ctx, preview = false) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: `https://graphql.datocms.com${preview ? '/preview' : ''}`,
            credentials: 'same-origin',
            fetch,
            headers: {
                Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`,
            },
        }),
        cache: new InMemoryCache().restore(initialState),
    });
}
