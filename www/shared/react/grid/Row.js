import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getResponsiveClasses } from './util';
import styles from './grid.module.css';

const Row = forwardRef(({
    className,
    component: Component,
    justifyContent,
    alignItems,
    ...rest
}, ref) => {
    const finalClassName = classNames(
        styles.row,
        getResponsiveClasses('justify-content', justifyContent),
        getResponsiveClasses('align-items', alignItems),
        className,
    );

    return (
        <Component ref={ ref } className={ finalClassName } { ...rest } />
    );
});

Row.defaultProps = {
    component: 'div',
};

const justifyContentPropType = PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']);
const alignItemsPropType = PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'baseline', 'stretch']);

Row.propTypes = {
    justifyContent: PropTypes.oneOfType([
        justifyContentPropType,
        PropTypes.shape({
            xxs: justifyContentPropType, // 0
            xs: justifyContentPropType,
            sm: justifyContentPropType,
            md: justifyContentPropType,
            lg: justifyContentPropType,
            xl: justifyContentPropType,
            xxl: justifyContentPropType,
        }),
    ]),
    alignItems: PropTypes.oneOfType([
        alignItemsPropType,
        PropTypes.shape({
            xxs: alignItemsPropType, // 0
            xs: alignItemsPropType,
            sm: alignItemsPropType,
            md: alignItemsPropType,
            lg: alignItemsPropType,
            xl: alignItemsPropType,
            xxl: alignItemsPropType,
        }),
    ]),
    component: PropTypes.elementType,
    className: PropTypes.string,
};

export default Row;
