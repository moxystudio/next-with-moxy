import React from 'react';
import { render, screen } from '../../../shared/test-utils';
import ProjectInfo from './ProjectInfo';

it('should render correctly', () => {
    render(<ProjectInfo name="foo" email="bar" />);

    expect(screen.getByText('contacts.name')).toBeInTheDocument();
    expect(screen.getByText('contacts.email')).toBeInTheDocument();
});
