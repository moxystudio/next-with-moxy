import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from '../../shared/react/grid';
import ProjectInfo from './project-info';
import contacts from './Contacts.data.js';

import styles from './Contacts.module.css';

const Contacts = () => (
    <main className={ styles.contacts }>
        <Container>
            <h1>
                <FormattedMessage id="contacts.title" />
            </h1>

            <ProjectInfo name={ contacts.name } email={ contacts.email } />
        </Container>
    </main>
);

export default Contacts;
