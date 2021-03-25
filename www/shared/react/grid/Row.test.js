import React from 'react';
import { render, screen } from '../testing-library';
import Row from './Row';

it('should render correctly', () => {
    render(<Row>Hello World</Row>);

    screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.startsWith('Hello'));
});

it('should render with passed component', () => {
    render(<Row component="span">Hello World</Row>);

    screen.getByText((content, element) => element.tagName.toLowerCase() === 'span' && content.startsWith('Hello'));
});

it('should respect passed className', () => {
    const { container } = render(<Row className="foo">Hello World</Row>);

    expect(container.querySelector('.foo')).toBeInTheDocument();
});

it('should respect passed justifyContent (string)', () => {
    const { container } = render(<Row justifyContent="flex-end">Hello World</Row>);

    expect(container.querySelector('div').classList.contains('row-justify-content-flex-end')).toBe(true);
});

it('should respect passed justifyContent (object)', () => {
    const { container } = render(
        <Row justifyContent={ { xxs: 'flex-end', xs: 'flex-start' } }>
            Hello World
        </Row>);

    const div = container.querySelector('div');

    expect(div.classList.contains('row-justify-content-xxs-flex-end')).toBe(true);
    expect(div.classList.contains('row-justify-content-xs-flex-start')).toBe(true);
});

it('should respect passed alignItems (string)', () => {
    const { container } = render(<Row alignItems="flex-end">Hello World</Row>);

    expect(container.querySelector('div').classList.contains('row-align-items-flex-end')).toBe(true);
});

it('should respect passed alignItems (object)', () => {
    const { container } = render(
        <Row alignItems={ { xxs: 'flex-end', xs: 'flex-start' } }>
            Hello World
        </Row>);

    const div = container.querySelector('div');

    expect(div.classList.contains('row-align-items-xxs-flex-end')).toBe(true);
    expect(div.classList.contains('row-align-items-xs-flex-start')).toBe(true);
});
