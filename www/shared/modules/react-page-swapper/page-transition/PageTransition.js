import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import styles from './PageTransition.module.css';

/* istanbul ignore next */
const getZIndex = (inProp) => !inProp ? 0 : 1;

const PageTransition = ({ node, animation, style, in: inProp, onEntered, onExited, className }) => (
    <CSSTransition
        in={ inProp }
        onEntered={ onEntered }
        onExited={ onExited }
        classNames={ {
            enter: styles.enter,
            enterActive: styles.enterActive,
            enterDone: styles.enterDone,
            exit: styles.exit,
            exitActive: styles.exitActive,
            exitDone: styles.exitDone,
        } }
        timeout={ 1000 }>
        <div className={ classNames(styles[animation], className) } style={ { ...style, zIndex: getZIndex(inProp) } }>
            { node }
        </div>
    </CSSTransition>
);

PageTransition.propTypes = {
    node: PropTypes.element.isRequired,
    animation: PropTypes.oneOf(['none', 'fade']),
    style: PropTypes.object,
    in: PropTypes.bool,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    className: PropTypes.string,
};

PageTransition.defaultProps = {
    in: false,
    animation: 'fade',
};

export default PageTransition;
