import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './Home.module.css';

const Home = () => (
    <main className={ styles.home }>
        <h1><FormattedMessage id="home.title" /></h1>
    </main>
);

export default Home;
