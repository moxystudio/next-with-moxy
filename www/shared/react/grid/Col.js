import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getResponsiveClasses } from './util';

import styles from './grid.module.css';

const Col = forwardRef(({ className, component: Component, columns, offset, ...rest }, ref) => {
    const finalClassName = classNames(
        styles.col,
        getResponsiveClasses('col-column', columns),
        getResponsiveClasses('col-offset', offset),
        className,
    );

    return (
        <Component ref={ ref } className={ finalClassName } { ...rest } />
    );
});

Col.defaultProps = {
    component: 'div',
};

const columnsPropType = PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
]);

Col.propTypes = {
    offset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            xxs: PropTypes.number, // 0
            xs: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number,
            xxl: PropTypes.number,
        }),
    ]),
    columns: PropTypes.oneOfType([
        columnsPropType,
        PropTypes.shape({
            xxs: columnsPropType, // 0
            xs: columnsPropType,
            sm: columnsPropType,
            md: columnsPropType,
            lg: columnsPropType,
            xl: columnsPropType,
            xxl: columnsPropType,
        }),
    ]),
    component: PropTypes.elementType,
    className: PropTypes.string,
};

export default Col;
