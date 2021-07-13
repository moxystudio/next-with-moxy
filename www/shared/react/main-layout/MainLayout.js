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
            <PageSwapper
                node={ children }
                nodeKey={ children.key }>
                { ({ node }) => (
                    <>
                        <div className={ styles.page }>{ node }</div>
                        <Footer className={ styles.footer } />
                    </>
                ) }
            </PageSwapper>
        </div>
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default MainLayout;
