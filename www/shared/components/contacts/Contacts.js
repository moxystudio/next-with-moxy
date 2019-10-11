import React from 'react';
import contacts from './Contacts.data.js';

const Contacts = () => (
    <>
        <p>Name: { contacts.name }</p>
        <p>Email: { contacts.email }</p>
    </>
);

export default Contacts;
