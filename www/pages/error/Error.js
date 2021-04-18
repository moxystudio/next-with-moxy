import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { getIntlProps } from '@moxy/next-intl';
import { Container } from '../../shared/react/grid';

import styles from './Error.module.css';

const ErrorPage = ({ type }) => (
    <main className={ styles.error }>
        <Container>
            <h1>
                { type === '404' ?
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
        </Container>
    </main>
);

ErrorPage.propTypes = {
    type: PropTypes.oneOf(['500', '404']).isRequired,
};

export const getStaticProps = async ({ locale }) => ({
    props: await getIntlProps(locale),
});

export default ErrorPage;
