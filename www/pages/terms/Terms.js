import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from '../../shared/react/grid';

import styles from './Terms.module.css';

const Terms = () => (
    <main className={ styles.terms }>
        <Container>
            <h1>
                <FormattedMessage id="terms.title" />
            </h1>
        </Container>
    </main>
);

export default Terms;
