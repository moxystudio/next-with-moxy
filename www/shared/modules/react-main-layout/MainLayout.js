import React from 'react';
import PropTypes from 'prop-types';
import PageSwapper from '../react-page-swapper';
import Header from '../react-header';
import Footer from '../react-footer';

import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => (
    <div className={ styles.mainLayout }>
        <Header className={ styles.header } />

        <div className={ styles.content }>
            <PageSwapper node={ children } nodeKey={ children.key } />
        </div>

        <Footer className={ styles.footer } />
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
