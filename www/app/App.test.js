import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import CookieBanner from '../shared/modules/react-cookie-banner';
import { initGTM, destroyGTM } from '../shared/utils/google-tag-manager';
import { AppTreeWrapper } from '../shared/test-utils/modules';

jest.mock('../shared/modules/react-cookie-banner', () => jest.fn(() => null));

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
            <App Component={ () => 'Hello World' } />
        </AppTreeWrapper>,
    );

    expect(container).toHaveTextContent('Hello World');
});

describe('GTM', () => {
    it('should initialize GTM if analytics is in the cookies consent', () => {
        CookieBanner.mockImplementation(({ onCookieConsents }) => {
            useEffect(() => {
                onCookieConsents(['analytics']);
            }, [onCookieConsents]);

            return null;
        });

        render(
            <AppTreeWrapper>
                <App Component={ () => 'Hello World' } />
            </AppTreeWrapper>,
        );

        expect(initGTM).toHaveBeenCalledTimes(1);
        expect(destroyGTM).toHaveBeenCalledTimes(0);
    });

    it('should destroy GTM if analytics is not on the cookies consent', () => {
        CookieBanner.mockImplementation(({ onCookieConsents }) => {
            useEffect(() => {
                onCookieConsents(['foo']);
            }, [onCookieConsents]);

            return null;
        });

        render(
            <AppTreeWrapper>
                <App Component={ () => 'Hello World' } />
            </AppTreeWrapper>,
        );

        expect(initGTM).toHaveBeenCalledTimes(0);
        expect(destroyGTM).toHaveBeenCalledTimes(1);
    });
});
