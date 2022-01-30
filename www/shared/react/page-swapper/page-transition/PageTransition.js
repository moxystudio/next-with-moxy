import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import styles from './PageTransition.module.css';

// This function might have to be adjusted if you have more than you transition property on animations.
const addEndListener = (node, done) => node.addEventListener('transitionend', done);

const PageTransition = ({ children, animation, style, in: inProp, onEntered, onExited, className }) => (
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
        addEndListener={ addEndListener }
        timeout={ 1000 }>
        <div className={ classNames(styles[animation], className) } style={ style }>
            { children }
        </div>
    </CSSTransition>
);

PageTransition.propTypes = {
    children: PropTypes.element.isRequired,
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
