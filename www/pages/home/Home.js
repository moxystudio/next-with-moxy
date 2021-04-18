import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getIntlProps } from '@moxy/next-intl';
import { Container } from '../../shared/react/grid';

import styles from './Home.module.css';

const Home = () => (
    <main className={ styles.home }>
        <Container>
            <h1>
                <FormattedMessage id="home.title" />
            </h1>
        </Container>
    </main>
);

export const getStaticProps = async ({ locale }) => ({
    props: await getIntlProps(locale),
});

export default Home;
