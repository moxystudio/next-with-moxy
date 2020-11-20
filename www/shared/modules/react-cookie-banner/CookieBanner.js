import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import Link from 'next/link';

import styles from './CookieBanner.module.css';

const CookieBanner = ({ onCookiesConsent }) => {
    const [mounted, setMounted] = useState(false);
    const [cookies, setCookie] = useCookies(['cookiesConsent', 'cookieBannerDismissed']);

    const { cookiesConsent = [], cookieBannerDismissed = false } = cookies;

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        onCookiesConsent(cookiesConsent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onCookiesConsent, cookiesConsent.join(',')]);

    const handleAcceptClick = useCallback(() => {
        setCookie('cookiesConsent', ['analytics'], { maxAge: 365 * 24 * 60 * 60 });
    }, [setCookie]);

    const handleRejectClick = useCallback(() => {
        setCookie('cookieBannerDismissed', true, { maxAge: 7 * 24 * 60 * 60 });
    }, [setCookie]);

    // Do not display banner if:
    // - user has previously dismissed or accepted at least one consent
    // - on SSR to avoid having to add "Vary: Cookie" to the response headers, which is bad for reverse proxy caches
    if (!mounted || cookieBannerDismissed || cookiesConsent.length > 0) {
        return null;
    }

    return (
        <div className={ styles.cookieBanner }>
            <p>
                <FormattedMessage
                    id="cookie-banner.text"
                    values={ {
                        link: /* istanbul ignore next */ (...chunks) => (
                            <Link href="/terms">
                                <a>{ chunks }</a>
                            </Link>
                        ),
                    } } />
            </p>

            <div className={ styles.buttons }>
                <button className={ styles.accept } type="button" onClick={ handleAcceptClick }>
                    <FormattedMessage id="cookie-banner.accept" />
                </button>
                <button type="button" onClick={ handleRejectClick }>
                    <FormattedMessage id="cookie-banner.reject" />
                </button>
            </div>
        </div>
    );
};

CookieBanner.propTypes = {
    className: PropTypes.string,
    onCookiesConsent: PropTypes.func.isRequired,
};

export default CookieBanner;
