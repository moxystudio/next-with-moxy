import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getIntlProps } from '@moxy/next-intl';
import Seo from '@moxy/next-seo';
import { Container } from '../../shared/react/grid';
import { useSeoData } from './Terms.data';

import styles from './Terms.module.css';

const Terms = () => {
    const seoData = useSeoData();

    return (
        <main className={ styles.terms }>
            <Seo data={ seoData } />

            <Container>
                <h1>
                    <FormattedMessage id="terms.title" />
                </h1>
            </Container>
        </main>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: await getIntlProps(locale),
});

export default Terms;
