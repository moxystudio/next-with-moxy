import React from 'react';
import Header from './Header';
import { render } from '../../test-utils';

it('should render correctly', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('header')).toBeInTheDocument();
});

it('should respect passed className', () => {
    const { container } = render(<Header className="foo" />);

    expect(container.querySelector('header')).toHaveClass('foo');
});
