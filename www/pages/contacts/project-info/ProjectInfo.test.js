import React from 'react';
import { render, screen } from '../../../shared/react/testing-library';
import ProjectInfo from './ProjectInfo';

it('should render correctly', () => {
    render(<ProjectInfo name="foo" email="bar" />);

    screen.getByText('contacts.name');
    screen.getByText('contacts.email');
});
