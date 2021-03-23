import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import Contacts from './Contacts';

it('should render correctly', () => {
    render(<Contacts />);

    screen.getByText('contacts.title');
});
