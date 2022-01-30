import React from 'react';
import PropTypes from 'prop-types';
import RawPageSwapper from '@moxy/react-page-swapper'; // eslint-disable-line no-restricted-imports
import { useRouterScroll } from '@moxy/next-router-scroll';
import PageTransition from './page-transition';

const PageSwapper = ({ children, pageTransitionClassName, ...rest }) => {
    const { updateScroll } = useRouterScroll();

    return (
        <RawPageSwapper mode="out-in" { ...rest } updateScroll={ updateScroll }>
            { ({ node, ...rest }) => {
                if (typeof children === 'function') {
                    node = children({ node, ...rest });
                }

                return <PageTransition className={ pageTransitionClassName } { ...rest }>{ node }</PageTransition>;
            } }
        </RawPageSwapper>
    );
};

PageSwapper.propTypes = {
    children: PropTypes.func,
    pageTransitionClassName: PropTypes.string,
};

export default PageSwapper;
