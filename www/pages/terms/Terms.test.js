import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import Terms from './Terms';

it('should render correctly', () => {
    render(<Terms />);

    expect(screen.getByText('terms.title')).toBeInTheDocument();
});
