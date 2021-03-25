import React from 'react';
import { render, screen } from '../testing-library';
import Col from './Col';

it('should render correctly', () => {
    render(<Col>Hello World</Col>);

    screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.startsWith('Hello'));
});

it('should render with passed component', () => {
    render(<Col component="span">Hello World</Col>);

    screen.getByText((content, element) => element.tagName.toLowerCase() === 'span' && content.startsWith('Hello'));
});

it('should respect passed className', () => {
    const { container } = render(<Col className="foo">Hello World</Col>);

    expect(container.querySelector('.foo')).toBeInTheDocument();
});

it('should respect passed columns (number)', () => {
    const { container } = render(<Col columns={ 1 }>Hello World</Col>);

    expect(container.querySelector('div').classList.contains('col-column-1')).toBe(true);
});

it('should respect passed columns (object)', () => {
    const { container } = render(
        <Col columns={ { xxs: 1, xs: 2 } }>
            Hello World
        </Col>);

    const div = container.querySelector('div');

    expect(div.classList.contains('col-column-xxs-1')).toBe(true);
    expect(div.classList.contains('col-column-xs-2')).toBe(true);
});

it('should respect passed offset (number)', () => {
    const { container } = render(<Col offset={ 1 }>Hello World</Col>);

    expect(container.querySelector('div').classList.contains('col-offset-1')).toBe(true);
});

it('should respect passed offset (object)', () => {
    const { container } = render(
        <Col offset={ { xxs: 1, xs: 2 } }>
            Hello World
        </Col>);

    const div = container.querySelector('div');

    expect(div.classList.contains('col-offset-xxs-1')).toBe(true);
    expect(div.classList.contains('col-offset-xs-2')).toBe(true);
});
