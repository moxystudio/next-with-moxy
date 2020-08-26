import React from 'react';
import { render, screen } from '../../test-utils';
import PageSwapper from './PageSwapper';

const MyComponent = () => <div>foo</div>;

it('should render correctly', () => {
    render(<PageSwapper node={ <MyComponent /> } />);

    screen.getByText('foo');
});

it('should respect passed className', () => {
    const { container } = render(<PageSwapper node={ <MyComponent /> } className="foo" />);

    expect(container.querySelector('.foo')).toBeInTheDocument();
});
