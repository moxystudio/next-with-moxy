import React from 'react';
import { render } from '@testing-library/react';
import AppTree from '../../test-utils/modules/react-app-tree';

beforeEach(() => {
    process.env.DATOCMS_TOKEN = 'foo';
});

afterEach(() => {
    jest.resetModules();
});

it('should render correctly', () => {
    const withApollo = require('./next-with-apollo').default;
    const AppWithApollo = withApollo(AppTree);

    const { getByText } = render((
        <AppWithApollo>
            <div>withApollo</div>
        </AppWithApollo>
    ));

    expect(getByText('withApollo')).toBeInTheDocument();
});

it('should render correctly with a preview URL', () => {
    const withApollo = require('./next-with-apollo').default;

    window.history.replaceState({}, 'foo', 'foo/?cms-preview');

    const AppWithApollo = withApollo(AppTree);

    const { getByText } = render((
        <AppWithApollo>
            <div>withApolloPreview</div>
        </AppWithApollo>
    ));

    expect(getByText('withApolloPreview')).toBeInTheDocument();
});

