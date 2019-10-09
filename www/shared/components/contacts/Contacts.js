import React from 'react';
import contacts from './Contacts.data';

const Contacts = () => (
    <>
        <p>Name: { contacts.name }</p>
        <p>Email: { contacts.email }</p>
    </>
);

export default Contacts;
