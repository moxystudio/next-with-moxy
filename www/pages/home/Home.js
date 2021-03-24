import React from 'react';
import { FormattedMessage } from 'react-intl';
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

export default Home;
