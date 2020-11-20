import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import CookieBanner from './CookieBanner';

afterEach(() => {
    jest.resetAllMocks();
});

it('should not render banner when banner was previously dismissed', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieBannerDismissed=true');

    const { container } = render(
        <CookieBanner onCookiesConsent={ () => {} } />,
    );

    expect(container.innerHTML).toBe('');
});

it('should not render banner if there\'s at least one consent', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookiesConsent=%5B%22analytics%22%5D');

    const { container } = render(
        <CookieBanner onCookiesConsent={ () => {} } />,
    );

    expect(container.innerHTML).toBe('');
});

it('should render if not dismissed and no consent was given', () => {
    render(<CookieBanner onCookiesConsent={ () => {} } />);

    expect(screen.getByText('cookie-banner.text')).toBeInTheDocument();
});

it('should call onCookiesConsent with the correct consents on mount', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookiesConsent=%5B%22analytics%22%5D');

    const handleCookiesConsent = jest.fn();

    const { unmount } = render(
        <CookieBanner onCookiesConsent={ handleCookiesConsent } />,
    );

    expect(handleCookiesConsent).toHaveBeenCalledTimes(1);
    expect(handleCookiesConsent).toHaveBeenCalledWith(['analytics']);

    handleCookiesConsent.mockReset();
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => '');

    unmount();
    render(
        <CookieBanner onCookiesConsent={ handleCookiesConsent } />,
    );

    expect(handleCookiesConsent).toHaveBeenCalledTimes(1);
    expect(handleCookiesConsent).toHaveBeenCalledWith([]);
});

it('should behave well when the accept button is clicked', () => {
    const handleCookiesConsent = jest.fn();

    const { container, rerender, getByText } = render(
        <CookieBanner onCookiesConsent={ handleCookiesConsent } />,
    );

    handleCookiesConsent.mockClear();

    userEvent.click(getByText('cookie-banner.accept'));

    expect(handleCookiesConsent).toHaveBeenCalledTimes(1);
    expect(handleCookiesConsent).toHaveBeenCalledWith(['analytics']);

    handleCookiesConsent.mockClear();

    rerender(
        <CookieBanner onCookiesConsent={ handleCookiesConsent } />,
    );

    expect(handleCookiesConsent).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe('');
});

it('should behave well when the reject button is clicked', () => {
    const handleCookiesConsent = jest.fn();

    const { container, rerender } = render(
        <CookieBanner onCookiesConsent={ handleCookiesConsent } />,
    );

    expect(container.innerHTML).not.toBe('');

    handleCookiesConsent.mockClear();

    userEvent.click(screen.getByText('cookie-banner.reject'));

    expect(handleCookiesConsent).not.toHaveBeenCalled();

    rerender(
        <CookieBanner onCookiesConsent={ handleCookiesConsent } />,
    );

    expect(handleCookiesConsent).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe('');
});
