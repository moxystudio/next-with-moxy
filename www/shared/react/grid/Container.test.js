import React from 'react';
import { render, screen } from '../testing-library';
import Container from './Container';

it('should render correctly', () => {
    render(<Container>Hello World</Container>);

    screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.startsWith('Hello'));
});

it('should render with passed component', () => {
    render(<Container component="span">Hello World</Container>);

    screen.getByText((content, element) => element.tagName.toLowerCase() === 'span' && content.startsWith('Hello'));
});

it('should respect passed className', () => {
    const { container } = render(<Container className="foo">Hello World</Container>);

    expect(container.querySelector('.foo')).toBeInTheDocument();
});
