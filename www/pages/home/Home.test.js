import React from 'react';
import Home from './Home';
import { render, screen } from '../../shared/test-utils';

it('should render correctly', () => {
    render(<Home />);

    expect(screen.getByText('home.title')).toBeInTheDocument();
});
