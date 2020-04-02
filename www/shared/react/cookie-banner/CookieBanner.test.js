import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CookieBanner } from './CookieBanner';
import { AppTree } from '../../test-utils/react';

afterEach(() => {
    jest.resetAllMocks();
});

it('should not render banner when banner was previously dismissed', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieBannerDismissed=true');

    const { container } = render(
        <AppTree>
            <CookieBanner onCookieConsents={ () => {} } />
        </AppTree>,
    );

    expect(container.innerHTML).toBe('');
});

it('should not render banner if there\'s at least one consent', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieConsents=%5B%22analytics%22%5D');

    const { container } = render(
        <AppTree>
            <CookieBanner onCookieConsents={ () => {} } />
        </AppTree>,
    );

    expect(container.innerHTML).toBe('');
});

it('should render if not dismissed and no consent was given', () => {
    const { container } = render(
        <AppTree>
            <CookieBanner onCookieConsents={ () => {} } />
        </AppTree>,
    );

    expect(container).toHaveTextContent('cookieBanner');
});

it('should call onCookieConsents with the correct consents on mount', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieConsents=%5B%22analytics%22%5D');

    const handleCookieConsents = jest.fn();

    render(
        <AppTree>
            <CookieBanner onCookieConsents={ handleCookieConsents } />
        </AppTree>,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith(['analytics']);

    handleCookieConsents.mockReset();
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => '');

    render(
        <AppTree>
            <CookieBanner onCookieConsents={ handleCookieConsents } />
        </AppTree>,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith([]);
});

it('should behave well when the accept button is clicked', () => {
    const handleCookieConsents = jest.fn();

    const { container, rerender, getByText } = render(
        <AppTree>
            <CookieBanner onCookieConsents={ handleCookieConsents } />
        </AppTree>,
    );

    handleCookieConsents.mockClear();

    fireEvent.click(getByText('cookieBanner.accept'));

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith(['analytics']);

    handleCookieConsents.mockClear();

    rerender(
        <AppTree>
            <CookieBanner onCookieConsents={ handleCookieConsents } />
        </AppTree>,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(0);
    expect(container.innerHTML).toBe('');
});

it('should behave well when the reject button is clicked', () => {
    const handleCookieConsents = jest.fn();

    const { container, rerender, getByText } = render(
        <AppTree>
            <CookieBanner onCookieConsents={ handleCookieConsents } />
        </AppTree>,
    );

    expect(container.innerHTML).not.toBe('');

    handleCookieConsents.mockClear();

    fireEvent.click(getByText('cookieBanner.reject'));

    expect(handleCookieConsents).toHaveBeenCalledTimes(0);

    rerender(
        <AppTree>
            <CookieBanner onCookieConsents={ handleCookieConsents } />
        </AppTree>,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(0);
    expect(container.innerHTML).toBe('');
});
