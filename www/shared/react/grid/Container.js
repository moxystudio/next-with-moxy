import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './grid.module.css';

const Container = forwardRef(({ className, component: Component, ...rest }, ref) => (
    <Component ref={ ref } className={ classNames(styles.container, className) } { ...rest } />
));

Container.defaultProps = {
    component: 'div',
};

Container.propTypes = {
    component: PropTypes.elementType,
    className: PropTypes.string,
};

export default Container;
