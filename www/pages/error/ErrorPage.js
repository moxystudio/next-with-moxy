import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import styles from './ErrorPage.module.css';

const ErrorPage = ({ statusCode }) => (
    <main className={ styles.error }>
        <h1>
            { statusCode === 404 ?
                <FormattedMessage id="error.not-found.title" /> :
                <FormattedMessage id="error.internal.title" />
            }
        </h1>

        <p>
            <Link href="/">
                <a>
                    <FormattedMessage id="error.return-to-home" />
                </a>
            </Link>
        </p>
    </main>
);

ErrorPage.propTypes = {
    statusCode: PropTypes.number.isRequired,
    err: PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        statusCode: PropTypes.number.isRequired,
    }),
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = err?.statusCode ?? res?.statusCode ?? 404;

    return { statusCode };
};

export default ErrorPage;
