import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import { App } from './App';
import { AppTreeWrapper } from '../shared/test-utils';
import { trackPageViews } from '../shared/utils/google-analytics';

jest.mock('../shared/utils/google-analytics', () => ({ trackPageViews: jest.fn(() => jest.fn()) }));

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

it('should call ga\'s trackPageViews on mount including cleanup on unmount', () => {
    const { unmount } = render(
        <AppTreeWrapper>
            <App Component={ () => 'Hello World' } router={ Router } />
        </AppTreeWrapper>,
    );

    expect(trackPageViews).toHaveBeenCalledTimes(1);
    expect(trackPageViews).toHaveBeenCalledWith(Router);

    const cleanup = trackPageViews.mock.results[0].value;

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
});

