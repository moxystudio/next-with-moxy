import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import { App } from './App';
import { AppTreeWrapper } from '../shared/tests';
import { trackOnRouteChanged } from '../shared/utils/google-analytics';

jest.mock('../shared/utils/google-analytics', () => ({ trackOnRouteChanged: jest.fn(() => jest.fn()) }));

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

it('should call ga\'s trackOnRouteChanged on mount including cleanup on unmount', () => {
    const { unmount } = render(
        <AppTreeWrapper>
            <App Component={ () => 'Hello World' } router={ Router } />
        </AppTreeWrapper>,
    );

    expect(trackOnRouteChanged).toHaveBeenCalledTimes(1);
    expect(trackOnRouteChanged).toHaveBeenCalledWith(Router);

    const cleanup = trackOnRouteChanged.mock.results[0].value;

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
});

