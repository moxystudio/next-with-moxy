import React from 'react';
import Terms from './Terms';
import { render, screen } from '../../shared/test-utils';

it('should render correctly', () => {
    render(<Terms />);

    expect(screen.getByText('terms.title')).toBeInTheDocument();
});
