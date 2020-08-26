import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './Terms.module.css';

const Terms = () => (
    <main className={ styles.terms }>
        <h1><FormattedMessage id="terms.title" /></h1>
    </main>
);

export default Terms;
