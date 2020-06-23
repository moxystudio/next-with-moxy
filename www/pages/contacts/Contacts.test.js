import React from 'react';
import Contacts from './Contacts';
import { render, screen } from '../../shared/test-utils';

it('should render correctly', () => {
    render(<Contacts />);

    expect(screen.getByText('contacts.title')).toBeInTheDocument();
});
