import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import { App } from './App';
import { AppTreeWrapper } from '../shared/test-utils';

jest.mock('../shared/utils/google-tag-manager', () => ({ initializeTagManager: jest.fn(() => jest.fn()) }));

beforeEach(() => {
    jest.clearAllMocks();
});

it('should render correctly', () => {
    const { container } = render(
        <AppTreeWrapper>
            <App Component={ () => 'Hello World' } router={ Router } />
        </AppTreeWrapper>,
    );

    expect(container).toHaveTextContent('Hello World');
});
