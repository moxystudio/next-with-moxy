import React from 'react';
import ProjectInfo from './ProjectInfo';
import { render, screen } from '../../../shared/test-utils';

it('should render correctly', () => {
    render(<ProjectInfo name="foo" email="bar" />);

    expect(screen.getByText('contacts.name')).toBeInTheDocument();
    expect(screen.getByText('contacts.email')).toBeInTheDocument();
});
