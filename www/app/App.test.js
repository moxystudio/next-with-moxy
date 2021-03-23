import React, { useEffect } from 'react';
import { render, screen } from '../shared/react/testing-library';
import { initGTM, destroyGTM } from '../shared/utils/google-tag-manager';
import CookieBanner from './cookie-banner';
import { App, AppInner } from './App';

jest.mock('./cookie-banner', () => jest.fn(() => null));

jest.mock('../shared/utils/google-tag-manager', () => ({
    initGTM: jest.fn(),
    destroyGTM: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

it('should render providers correctly', () => {
    render(<App Component={ () => 'Hello World' } pageProps={ {} } />, { wrapper: undefined });

    screen.getByText('Hello World');
});

it('should render correctly (inner)', () => {
    render(<AppInner Component={ () => 'Hello World' } pageProps={ {} } />);

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

        render(<AppInner Component={ () => 'Hello World' } pageProps={ {} } />);

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

        render(<AppInner Component={ () => 'Hello World' } pageProps={ {} } />);

        expect(initGTM).toHaveBeenCalledTimes(0);
        expect(destroyGTM).toHaveBeenCalledTimes(1);
    });
});
