import React from 'react';
import { FormattedMessage } from 'react-intl';
import contacts from './Contacts.data.js';

import styles from './Contacts.module.css';

const Contacts = () => (
    <div className={ styles.contacts }>
        <h1><FormattedMessage id="contacts.title" /></h1>
        <p><FormattedMessage id="contacts.name" values={ { name: contacts.name } } /></p>
        <p><FormattedMessage id="contacts.email" values={ { email: contacts.email } } /></p>
    </div>
);

export default Contacts;
