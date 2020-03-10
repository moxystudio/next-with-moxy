import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import WaitForReact from '@moxy/react-wait-for-react';

import styles from './SplashScreen.module.css';

const progressInterval = 250; // Keep this value slightly higher than the one defined in the CSS
const applyProgressBeforeInteractive = `function (elements, progress) {
    elements.splashScreen.classList.add('${styles.loading}');
    elements.progressBar.style.transform = 'scaleX(' + progress + ')';
}`.replace(/\n\s*/gm, ' ');

const SplashScreen = memo(({ className, ...rest }) => (
    <WaitForReact
        progressInterval={ progressInterval }
        applyProgressBeforeInteractive={ applyProgressBeforeInteractive }
        { ...rest }>
        { ({ progress, error }) => (
            <div
                data-wait-for-react-element="splashScreen"
                className={ classNames(styles.splashScreen, {
                    [styles.loading]: progress > 0 && progress < 1,
                    [styles.loaded]: progress === 1,
                }, className) }>
                <div
                    data-wait-for-react-element="progressBar"
                    className={ styles.progressBar }
                    style={ { transform: `scaleX(${progress})` } } />

                { error ? <FormattedMessage id="splash-screen.error" /> : 'Logo or some welcome text' }
            </div>
        ) }
    </WaitForReact>
));

SplashScreen.propTypes = {
    promise: PropTypes.object,
    onDone: PropTypes.func,
    className: PropTypes.string,
};

export default SplashScreen;
