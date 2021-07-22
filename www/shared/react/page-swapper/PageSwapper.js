import React from 'react';
import PropTypes from 'prop-types';
import RawPageSwapper from '@moxy/react-page-swapper'; // eslint-disable-line no-restricted-imports
import { useRouterScroll } from '@moxy/next-router-scroll';
import PageTransition from './page-transition';

const PageSwapper = ({ children, pageTransitionClassName, ...rest }) => {
    const { updateScroll } = useRouterScroll();

    return (
        <RawPageSwapper { ...rest } updateScroll={ updateScroll }>
            { ({ node, ...rest }) => {
                if (typeof children === 'function') {
                    node = children({ node, ...rest });
                }

                return <PageTransition node={ node } className={ pageTransitionClassName } { ...rest } />;
            } }
        </RawPageSwapper>
    );
};

PageSwapper.propTypes = {
    children: PropTypes.func,
    pageTransitionClassName: PropTypes.string,
};

export default PageSwapper;
