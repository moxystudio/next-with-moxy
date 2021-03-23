import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RawPageSwapper from '@moxy/react-page-swapper'; // eslint-disable-line no-restricted-imports
import { useRouterScroll } from '@moxy/next-router-scroll';
import PageTransition from './page-transition';

import styles from './PageSwapper.module.css';

const PageSwapper = ({ className, ...rest }) => {
    const { updateScroll } = useRouterScroll();

    return (
        <RawPageSwapper
            { ...rest }
            updateScroll={ updateScroll }
            className={ classNames(styles.pageSwapper, className) }>
            { (props) => <PageTransition { ...props } /> }
        </RawPageSwapper>
    );
};

PageSwapper.propTypes = {
    className: PropTypes.string,
};

export default PageSwapper;
