import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import Home from './Home';

it('should render correctly', () => {
    render(<Home />);

    screen.getByText('home.title');
});
