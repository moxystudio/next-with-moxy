import React from 'react';
import { render, screen } from '../../shared/test-utils';
import Contacts from './Contacts';

it('should render correctly', () => {
    render(<Contacts />);

    expect(screen.getByText('contacts.title')).toBeInTheDocument();
});
