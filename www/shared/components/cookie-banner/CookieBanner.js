import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import Link from 'next/link';

import styles from './CookieBanner.module.css';

export const CookieBanner = ({ onCookieConsents }) => {
    const [mounted, setMounted] = useState(false);
    const [cookies, setCookie] = useCookies(['cookieConsents', 'cookieBannerDismissed']);

    const { cookieConsents = [], cookieBannerDismissed = false } = cookies;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        onCookieConsents(cookieConsents);
    }, [onCookieConsents, cookieConsents]);

    const handleAcceptClick = useCallback(() => {
        setCookie('cookieConsents', ['analytics'], { maxAge: 365 * 24 * 60 * 60 });
    }, [setCookie]);

    const handleRejectClick = useCallback(() => {
        setCookie('cookieBannerDismissed', true, { maxAge: 7 * 24 * 60 * 60 });
    }, [setCookie]);

    // Do not display banner if:
    // - user has previously dismissed or accepted at least one consent
    // - on SSR to avoid having to add "Vary: Cookie" to the response headers, which is bad for reverse proxy caches
    if (!mounted || cookieBannerDismissed || cookieConsents.length > 0) {
        return null;
    }

    return (
        <span className={ styles.cookieBanner }>
            <span>
                <FormattedMessage
                    id="cookieBanner.text"
                    values={ {
                        link: (...chunks) => (
                            <Link href="/terms">
                                <a>{ chunks }</a>
                            </Link>
                        ),
                    } } />
            </span>

            <div className={ styles.buttons }>
                <button className={ styles.accept } type="button" onClick={ handleAcceptClick }>
                    <FormattedMessage id="cookieBanner.accept" />
                </button>
                <button type="button" onClick={ handleRejectClick }>
                    <FormattedMessage id="cookieBanner.reject" />
                </button>
            </div>
        </span>
    );
};

CookieBanner.propTypes = {
    className: PropTypes.string,
    onCookieConsents: PropTypes.func.isRequired,
};

export default CookieBanner;
