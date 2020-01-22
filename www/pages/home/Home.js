import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Contacts } from '../../shared/components';

import styles from './Home.module.css';

const Home = () => (
    <div className={ styles.home }>
        <h1><FormattedMessage id="home.title" /></h1>

        <Contacts />
    </div>
);

export default Home;
