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
    flexDirection,
    ...rest
}, ref) => {
    const finalClassName = classNames(
        styles.row,
        getResponsiveClasses(styles, 'row-justify-content', justifyContent),
        getResponsiveClasses(styles, 'row-align-items', alignItems),
        getResponsiveClasses(styles, 'row-flex-direction', flexDirection),
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
const flexDirectionPropType = PropTypes.oneOf(['row', 'row-reverse']);

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
    flexDirection: PropTypes.oneOfType([
        flexDirectionPropType,
        PropTypes.shape({
            xxs: flexDirectionPropType, // 0
            xs: flexDirectionPropType,
            sm: flexDirectionPropType,
            md: flexDirectionPropType,
            lg: flexDirectionPropType,
            xl: flexDirectionPropType,
            xxl: flexDirectionPropType,
        }),
    ]),
    component: PropTypes.elementType,
    className: PropTypes.string,
};

export default Row;
