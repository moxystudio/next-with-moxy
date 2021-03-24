import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageSwapper from '../page-swapper';
import Header from './header';
import Footer from './footer';

import styles from './MainLayout.module.css';

const MainLayout = ({ children, className, ...rest }) => (
    <div className={ classNames(styles.mainLayout, className) } { ...rest }>
        <Header className={ styles.header } />

        <div className={ styles.content }>
            <PageSwapper node={ children } nodeKey={ children.key } />
        </div>

        <Footer className={ styles.footer } />
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default MainLayout;
