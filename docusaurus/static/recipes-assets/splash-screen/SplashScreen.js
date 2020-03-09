import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import WaitForReact from '@moxy/react-wait-for-react';

import styles from './SplashScreen.module.css';

const progressInterval = 200; // Keep this duration in sync with the one defined in the CSS
const applyProgressBeforeInteractive = `function (elements, progress) {
    elements.progressBar.style.transform = 'scaleX(' + progress + ')';
    elements.progressBar.style.opacity = progress > 0 ? 1 : 0;
}`.replace(/\n\s*/gm, ' ');

const SplashScreen = memo((props) => (
    <WaitForReact
        progressInterval={ progressInterval }
        applyProgressBeforeInteractive={ applyProgressBeforeInteractive }
        maxProgressBeforeInteractive={ process.env.NODE_ENV === 'production' ? undefined : 0 }
        { ...props }>
        { ({ progress, error }) => (
            <div className={ classNames(styles.splashScreen, { [styles.loaded]: progress >= 1 }) }>
                <div
                    data-wait-for-react-element="progressBar"
                    className={ styles.progressBar }
                    style={ {
                        transform: `scaleX(${progress})`,
                        opacity: progress > 0 ? 1 : 0,
                    } } />

                { error ? <FormattedMessage id="splash-screen.error" /> : 'Logo or some welcome text' }
            </div>
        ) }
    </WaitForReact>
));

SplashScreen.propTypes = {
    promise: PropTypes.object,
    onDone: PropTypes.func,
};

export default SplashScreen;
