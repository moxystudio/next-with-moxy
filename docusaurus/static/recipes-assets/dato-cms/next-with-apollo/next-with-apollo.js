import React from 'react';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';

import createApolloClient from './apollo-client';

export default withApollo(
    ({ initialState, ctx }) => {
        if ((typeof ctx !== 'undefined' && Object.hasOwnProperty.call(ctx.query, 'cms-preview')) ||
        (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('cms-preview'))) {
            return createApolloClient(initialState, ctx, true);
        }

        return createApolloClient(initialState, ctx);
    },
    {
        // eslint-disable-next-line react/prop-types
        render: ({ Page, props }) => (
            // eslint-disable-next-line react/prop-types
            <ApolloProvider client={ props.apollo }>
                <Page { ...props } />
            </ApolloProvider>
        ),
    },
);
