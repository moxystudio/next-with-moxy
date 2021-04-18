import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { createLocalStorageStateHook } from 'use-local-storage-state';

import styles from './CookieBanner.module.css';

const MAX_CONSENT_DAYS = 365;
const MAX_REJECTED_DAYS = 7;

const useLocalStorageState = createLocalStorageStateHook('cookie-banner', {
    consents: [],
    consentedAt: null,
    rejectedAt: null,
});

const CookieBanner = ({ className, onConsents, ...rest }) => {
    const [mounted, setMounted] = useState(false);
    const [state, setState] = useLocalStorageState();

    const consents = useMemo(() => (
        state.consentedAt > Date.now() - (MAX_CONSENT_DAYS * 24 * 60 * 60 * 1000) ? state.consents : []
    ), [state]);
    const rejected = !!(state.rejectedAt >= Date.now() - (MAX_REJECTED_DAYS * 24 * 60 * 60 * 1000));

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        onConsents(consents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consents.join(','), onConsents]);

    const handleAcceptClick = useCallback(() => {
        setState({
            ...state,
            consents: ['analytics'],
            consentedAt: Date.now(),
            rejectedAt: null,
        });
    }, [state, setState]);

    const handleRejectClick = useCallback(() => {
        setState({
            ...state,
            consents: [],
            consentedAt: null,
            rejectedAt: Date.now(),
        });
    }, [state, setState]);

    // Do not display banner if:
    // - user has previously rejected or accepted at least one consent
    // - on SSR to avoid having to add "Vary: Cookie" to the response headers, which is bad for reverse proxy caches
    if (!mounted || rejected || consents.length > 0) {
        return null;
    }

    return (
        <div className={ classNames(styles.cookieBanner, className) } { ...rest }>
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
    onConsents: PropTypes.func.isRequired,
};

export default CookieBanner;
