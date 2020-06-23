import React from 'react';
import Footer from './Footer';
import { render } from '../../test-utils';

it('should render correctly', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('footer')).toBeInTheDocument();
});

it('should respect passed className', () => {
    const { container } = render(<Footer className="foo" />);

    expect(container.querySelector('footer')).toHaveClass('foo');
});
