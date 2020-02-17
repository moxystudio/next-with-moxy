import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import styles from './ErrorPage.module.css';

const ErrorPage = ({ statusCode }) => (
    <div className={ styles.error }>
        <h1>
            { statusCode === 404 ?
                <FormattedMessage id="error.not_found.title" /> :
                <FormattedMessage id="error.internal.title" />
            }
        </h1>

        <p>
            <Link href="/">
                <a>
                    <FormattedMessage id="error.return_to_home" />
                </a>
            </Link>
        </p>
    </div>
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
