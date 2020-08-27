import React from 'react';
import Router from 'next/router'; // eslint-disable-line no-restricted-imports
import { render, screen } from '../../test-utils';
import usePageKey from './use-page-key';

const MyComponent = () => {
    const pageKey = usePageKey();

    return pageKey;
};

it('should return the correct page key', () => {
    Router.pathname = '/blog/[name]';
    Router.asPath = '/blog/foo?baz=1';

    render(<MyComponent />, { wrapper: undefined });

    screen.getByText('/blog/foo');
});
