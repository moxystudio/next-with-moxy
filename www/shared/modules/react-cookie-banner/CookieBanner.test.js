import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import CookieBanner from './CookieBanner';

afterEach(() => {
    jest.resetAllMocks();
});

it('should not render banner when banner was previously dismissed', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieBannerDismissed=true');

    const { container } = render(
        <CookieBanner onCookieConsents={ () => {} } />,
    );

    expect(container.innerHTML).toBe('');
});

it('should not render banner if there\'s at least one consent', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieConsents=%5B%22analytics%22%5D');

    const { container } = render(
        <CookieBanner onCookieConsents={ () => {} } />,
    );

    expect(container.innerHTML).toBe('');
});

it('should render if not dismissed and no consent was given', () => {
    render(<CookieBanner onCookieConsents={ () => {} } />);

    expect(screen.getByText('cookie-banner.text')).toBeInTheDocument();
});

it('should call onCookieConsents with the correct consents on mount', () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => 'cookieConsents=%5B%22analytics%22%5D');

    const handleCookieConsents = jest.fn();

    const { unmount } = render(
        <CookieBanner onCookieConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith(['analytics']);

    handleCookieConsents.mockReset();
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => '');

    unmount();
    render(
        <CookieBanner onCookieConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith([]);
});

it('should behave well when the accept button is clicked', () => {
    const handleCookieConsents = jest.fn();

    const { container, rerender, getByText } = render(
        <CookieBanner onCookieConsents={ handleCookieConsents } />,
    );

    handleCookieConsents.mockClear();

    userEvent.click(getByText('cookie-banner.accept'));

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith(['analytics']);

    handleCookieConsents.mockClear();

    rerender(
        <CookieBanner onCookieConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe('');
});

it('should behave well when the reject button is clicked', () => {
    const handleCookieConsents = jest.fn();

    const { container, rerender } = render(
        <CookieBanner onCookieConsents={ handleCookieConsents } />,
    );

    expect(container.innerHTML).not.toBe('');

    handleCookieConsents.mockClear();

    userEvent.click(screen.getByText('cookie-banner.reject'));

    expect(handleCookieConsents).not.toHaveBeenCalled();

    rerender(
        <CookieBanner onCookieConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe('');
});

it('should respect passed className', () => {
    const handleCookieConsents = () => {};

    const { container } = render(
        <CookieBanner className="foo" onCookieConsents={ handleCookieConsents } />,
    );

    expect(container.querySelector('.foo')).toBeTruthy();
});
