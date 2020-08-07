import React from 'react';
import { render, screen } from '../../shared/test-utils';
import Home from './Home';

it('should render correctly', () => {
    render(<Home />);

    expect(screen.getByText('home.title')).toBeInTheDocument();
});
