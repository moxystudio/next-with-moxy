import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Contacts } from '../../shared/components';

import styles from './Home.module.css';

const Home = () => (
    <div className={ styles.home }>
        <FormattedMessage id="home.title" />

        <Contacts />
    </div>
);

export default Home;
