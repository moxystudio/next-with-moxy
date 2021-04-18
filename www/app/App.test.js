import React, { useEffect } from 'react';
import { render, screen } from '../shared/react/testing-library';
import { initGTM, destroyGTM } from '../shared/modules/google-tag-manager';
import CookieBanner from './cookie-banner';
import { App } from './App';

jest.mock('./cookie-banner', () => jest.fn(() => null));

jest.mock('../shared/modules/google-tag-manager', () => ({
    initGTM: jest.fn(),
    destroyGTM: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

it('should render correctly', () => {
    render(<App Component={ () => 'Hello World' } pageProps={ {} } />, { wrapper: undefined });

    screen.getByText('Hello World');
});

describe('GTM', () => {
    it('should initialize GTM if analytics is in the cookies consent', () => {
        CookieBanner.mockImplementation(({ onConsents }) => {
            useEffect(() => {
                onConsents(['analytics']);
            }, [onConsents]);

            return null;
        });

        render(<App Component={ () => 'Hello World' } pageProps={ {} } />, { wrapper: undefined });

        expect(initGTM).toHaveBeenCalledTimes(1);
        expect(destroyGTM).toHaveBeenCalledTimes(0);
    });

    it('should destroy GTM if analytics is not on the cookies consent', () => {
        CookieBanner.mockImplementation(({ onConsents }) => {
            useEffect(() => {
                onConsents(['foo']);
            }, [onConsents]);

            return null;
        });

        render(<App Component={ () => 'Hello World' } pageProps={ {} } />, { wrapper: undefined });

        expect(initGTM).toHaveBeenCalledTimes(0);
        expect(destroyGTM).toHaveBeenCalledTimes(1);
    });
});
