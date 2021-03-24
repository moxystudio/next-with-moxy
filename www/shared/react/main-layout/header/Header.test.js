import React from 'react';
import { render } from '../../testing-library';
import Header from './Header';

it('should render correctly', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('header')).toBeInTheDocument();
});

it('should respect passed className', () => {
    const { container } = render(<Header className="foo" />);

    expect(container.querySelector('header')).toHaveClass('foo');
});
