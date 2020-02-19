import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CookieBanner } from './CookieBanner';
import { AppTree } from '../../tests/components';
import { useCookieConsents } from '@enzsft/react-cookie-consents';

const mockAdd = jest.fn();

jest.mock('@enzsft/react-cookie-consents',
    () => ({
        useCookieConsents: jest.fn(() => ({
            get: () => [],
            add: mockAdd,
        })),
    }),
);

const initialProps = {
    setDaysToExpire: jest.fn(),
    onCookieConsent: jest.fn(),
};

describe('Render Cookie Banner', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render banner when cookie consent was not yet accepted or rejected', () => {
        const { container } = render(
            <AppTree><CookieBanner { ...initialProps } /></AppTree>,
        );

        expect(container).toHaveTextContent('cookieBanner');
    });

    it('should not initialize GTM when cookie consent was rejected ', () => {
        const { getByText } = render(
            <AppTree><CookieBanner { ...initialProps } /></AppTree>,
        );

        const buttonNode = getByText('cookieBanner.reject');

        fireEvent.click(buttonNode);

        expect(mockAdd).toHaveBeenCalledWith('reject');
        expect(initialProps.setDaysToExpire).toHaveBeenCalledWith(7);

        const { container } = render(
            <AppTree><CookieBanner { ...initialProps } /></AppTree>,
        );

        expect(container).toHaveTextContent('cookieBanner');
    });

    it('should add analytics and initiliaze gtm when accept button is clicked', () => {
        const { getByText } = render(
            <AppTree><CookieBanner { ...initialProps } /></AppTree>,
        );

        const buttonNode = getByText('cookieBanner.accept');

        fireEvent.click(buttonNode);

        expect(mockAdd).toHaveBeenCalledWith('analytics');
        expect(initialProps.setDaysToExpire).toHaveBeenCalledWith(365);
        expect(initialProps.onCookieConsent).toHaveBeenCalled();
    });
});

describe('Initialize GTM', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize analytics if cookies were accepted', () => {
        useCookieConsents.mockImplementation(() => ({
            get: () => ['analytics'],
            add: mockAdd,
        }));

        render(<AppTree><CookieBanner { ...initialProps } /></AppTree>);

        expect(initialProps.onCookieConsent).toHaveBeenCalled();
    });

    it('should not initialize analytics if cookies were rejected', () => {
        useCookieConsents.mockImplementation(() => ({
            get: () => ['reject'],
            add: mockAdd,
        }));

        render(<AppTree><CookieBanner { ...initialProps } /></AppTree>);

        expect(initialProps.onCookieConsent).not.toHaveBeenCalled();
    });

    it('should not call onCookieConsent more than once, even if there is a rerender', () => {
        useCookieConsents.mockImplementation(() => ({
            get: () => ['analytics'],
            add: mockAdd,
        }));

        const setDaysToExpire = jest.fn();
        const onCookieConsent = jest.fn();

        const { rerender } = render(
            <AppTree>
                <CookieBanner
                    { ...initialProps } />
            </AppTree>,
        );

        rerender(
            <AppTree>
                <CookieBanner
                    setDaysToExpire={ setDaysToExpire }
                    onCookieConsent={ onCookieConsent } />
            </AppTree>,
        );

        expect(initialProps.onCookieConsent).toHaveBeenCalledTimes(1);
    });
});
