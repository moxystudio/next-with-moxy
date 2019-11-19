import React from 'react';
import { FormattedMessage } from 'react-intl';
import contacts from './Contacts.data.js';

const Contacts = () => (
    <>
        <p>
            <FormattedMessage id="contacts.name" values={ { name: contacts.name } } />
        </p>

        <p>
            <FormattedMessage id="contacts.email" values={ { email: contacts.email } } />
        </p>
    </>
);

export default Contacts;
