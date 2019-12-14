import React from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { Contacts } from '../../shared/components';

import styles from './Home.css';

const Home = () => (
    <div className={ styles.home }>
        <FormattedMessage id="home.title" />

        <Contacts />
    </div>
);

export default Home;
