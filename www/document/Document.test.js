import React from 'react';
import { render } from '@testing-library/react';

jest.mock('next/document', () => ({
    __esModule: true,
    Html: ({ children }) => children,
    Head: ({ children }) => <head>{ children }</head>, // eslint-disable-line react/prop-types
    Main: () => <div />,
    NextScript: () => <div />,
    default: require('react').Component,
}));

import { Document } from './Document';

beforeAll(() => {
    global.__NEXT_INTL_POLYFILL_URL__ = 'foo.js';
});

it('should render correctly', () => {
    const { container } = render(<Document />, {
        container: document.createElement('html'),
    });

    expect(container.innerHTML).toMatchSnapshot();
});
