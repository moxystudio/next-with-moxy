import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import { App } from './App';
import { AppTreeWrapper } from '../shared/test-utils';

jest.mock('../shared/utils/google-tag-manager', () => ({
    initGTM: jest.fn(),
    destroyGTM: jest.fn(),
}));

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

describe('GTM', () => {
    it.todo('should initialize GTM if analytics is in the cookies consent');

    it.todo('should destroy GTM if analytics is not on the cookies consent');
});
