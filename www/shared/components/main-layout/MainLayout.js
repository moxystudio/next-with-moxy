import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import Footer from '../footer';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => (
    <div className={ styles.mainLayout }>
        <Header className={ styles.header } />

        <main className={ styles.content }>
            { children }
        </main>

        <Footer className={ styles.footer } />
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
