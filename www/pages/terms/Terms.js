import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './Terms.module.css';

const Terms = () => (
    <div className={ styles.terms }>
        <h1><FormattedMessage id="terms.title" /></h1>
    </div>
);

export default Terms;
