import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import fetch from 'isomorphic-unfetch';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
    },
    query: {
        fetchPolicy: 'network-only',
    },
};

const createApolloClient = (initialState, ctx, preview = false) =>
    new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: `https://graphql.datocms.com${preview ? '/preview' : ''}`,
            credentials: 'same-origin',
            fetch,
            headers: {
                Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`,
            },
        }),
        cache: new InMemoryCache(),
        defaultOptions,
    });

export default createApolloClient;
