import React from 'react';
import { render } from '../shared/test-utils';
import Document from './Document';

jest.mock('next/document', () => ({
    __esModule: true,
    Html: ({ children }) => children,
    Head: ({ children }) => <head>{ children }</head>,
    Main: () => <div />,
    NextScript: () => <div />,
    default: require('react').Component,
}));

beforeAll(() => {
    global.__NEXT_INTL_POLYFILL_URL__ = 'foo.js';
});

it('should render correctly', () => {
    const { container } = render(<Document />, {
        container: document.createElement('html'),
    });

    expect(container.innerHTML).toMatchSnapshot();
});
