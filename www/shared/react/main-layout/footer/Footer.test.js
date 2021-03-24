import React from 'react';
import { render } from '../../testing-library';
import Footer from './Footer';

it('should render correctly', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('footer')).toBeInTheDocument();
});

it('should respect passed className', () => {
    const { container } = render(<Footer className="foo" />);

    expect(container.querySelector('footer')).toHaveClass('foo');
});
