import React from 'react';
import { render, screen, userEvent } from '../../shared/react/testing-library';
import CookieBanner from './CookieBanner';

Storage.prototype.getItem = jest.fn(() => 'bla');

afterEach(() => {
    jest.resetAllMocks();
});

it('should not render banner when banner was previously rejected', () => {
    Storage.prototype.getItem.mockImplementation(() => JSON.stringify({ rejectedAt: Date.now() }));

    const { container } = render(
        <CookieBanner onConsents={ () => {} } />,
    );

    expect(container.innerHTML).toBe('');
});

it('should not render banner if there\'s at least one consent', () => {
    Storage.prototype.getItem.mockImplementation(() => JSON.stringify({ consents: ['analytics'], consentedAt: Date.now() }));

    const { container } = render(
        <CookieBanner onConsents={ () => {} } />,
    );

    expect(container.innerHTML).toBe('');
});

it('should render if not rejected and no consent was given', () => {
    render(<CookieBanner onConsents={ () => {} } />);

    expect(screen.getByText('cookie-banner.text')).toBeInTheDocument();
});

it('should call onConsents with the correct consents on mount', () => {
    Storage.prototype.getItem.mockImplementation(() => JSON.stringify({ consents: ['analytics'], consentedAt: Date.now() }));

    const handleCookieConsents = jest.fn();

    const { unmount } = render(
        <CookieBanner onConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith(['analytics']);

    handleCookieConsents.mockReset();
    Storage.prototype.getItem.mockImplementation(() => null);

    unmount();
    render(
        <CookieBanner onConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith([]);
});

it('should behave well when the accept button is clicked', () => {
    const handleCookieConsents = jest.fn();

    const { container, rerender, getByText } = render(
        <CookieBanner onConsents={ handleCookieConsents } />,
    );

    handleCookieConsents.mockClear();

    userEvent.click(getByText('cookie-banner.accept'));

    expect(handleCookieConsents).toHaveBeenCalledTimes(1);
    expect(handleCookieConsents).toHaveBeenCalledWith(['analytics']);

    handleCookieConsents.mockClear();

    rerender(
        <CookieBanner onConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe('');
});

it('should behave well when the reject button is clicked', () => {
    const handleCookieConsents = jest.fn();

    const { container, rerender } = render(
        <CookieBanner onConsents={ handleCookieConsents } />,
    );

    expect(container.innerHTML).not.toBe('');

    handleCookieConsents.mockClear();

    userEvent.click(screen.getByText('cookie-banner.reject'));

    expect(handleCookieConsents).not.toHaveBeenCalled();

    rerender(
        <CookieBanner onConsents={ handleCookieConsents } />,
    );

    expect(handleCookieConsents).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe('');
});

it('should respect passed className', () => {
    const handleCookieConsents = () => {};

    const { container } = render(
        <CookieBanner className="foo" onConsents={ handleCookieConsents } />,
    );

    expect(container.querySelector('.foo')).toBeTruthy();
});
