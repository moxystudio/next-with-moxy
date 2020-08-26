import React from 'react';
import RawPageSwapper from '@moxy/react-page-swapper'; // eslint-disable-line no-restricted-imports
import { useRouterScroll } from '@moxy/next-router-scroll';
import PageTransition from './page-transition';

import styles from './PageSwapper.module.css';

const PageSwapper = (props) => {
    const { updateScroll } = useRouterScroll();

    return (
        <RawPageSwapper
            { ...props }
            updateScroll={ updateScroll }
            className={ styles.pageSwapper }>
            { (props) => <PageTransition { ...props } /> }
        </RawPageSwapper>
    );
};

export default PageSwapper;
