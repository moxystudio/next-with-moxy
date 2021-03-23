import React from 'react';
import { render, screen } from '../testing-library';

beforeEach(() => {
    process.env.DATOCMS_TOKEN = 'foo';
});

afterEach(() => {
    jest.resetModules();
});

const MyComponent = ({ children }) => children;

it('should render correctly', () => {
    const withApollo = require('./next-with-apollo').default;
    const MyComponentWithApollo = withApollo(MyComponent);

    render((
        <MyComponentWithApollo>
            <div>withApollo</div>
        </MyComponentWithApollo>
    ));

    screen.getByText('withApollo');
});

it('should render correctly with a preview URL', () => {
    const withApollo = require('./next-with-apollo').default;

    window.history.replaceState({}, 'foo', 'foo/?cms-preview');

    const MyComponentWithApollo = withApollo(MyComponent);

    render((
        <MyComponentWithApollo>
            <div>withApolloPreview</div>
        </MyComponentWithApollo>
    ));

    screen.getByText('withApollo');
});
