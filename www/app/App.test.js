import React from 'react';

import { App } from './App';
import { renderWithIntl } from '../shared/test/utils';

beforeAll(() => {
    document.documentElement.innerHTML = '<div id="__next" style="position: static; top: auto; left: auto; right: auto" />';
});

const getTree = (props) => renderWithIntl(
    <App
        Component={ () => <div>Hello World</div> } // eslint-disable-line react/jsx-no-bind
        { ...props } />,
);

it('should render correctly', () => {
    const { container } = getTree();

    expect(container).toHaveTextContent('Hello World');
});

it('should return entries on getInitialProps', async () => {
    const result = await App.getInitialProps({
        Component: {
            getInitialProps: () => Promise.resolve('foo'),
        },
        ctx: {
            locale: {
                id: 'id',
                name: 'name',
            },
        },
    });

    expect(result).toMatchObject({ pageProps: 'foo' });
});

it('should return empty object if not sent component  with getInitialProps on getInitialProps', async () => {
    const result = await App.getInitialProps({
        Component: { },
        ctx: {
            locale: {
                id: 'id',
                name: 'name',
            },
        } });

    expect(result).toMatchObject({});
});
