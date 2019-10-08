import React from 'react';
import { Contacts } from '../../shared/components';

import styles from './Home.css';

const Home = () => (
    <div className={ styles.home }>
        Home Page
        <Contacts />
    </div>
);

export default Home;
