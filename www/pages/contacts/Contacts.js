import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProjectInfo from './project-info';
import contacts from './Contacts.data.js';

import styles from './Contacts.module.css';

const Contacts = () => (
    <div className={ styles.contacts }>
        <h1><FormattedMessage id="contacts.title" /></h1>
        <ProjectInfo name={ contacts.name } email={ contacts.email } />
    </div>
);

export default Contacts;
