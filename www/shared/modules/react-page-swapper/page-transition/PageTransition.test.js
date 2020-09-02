import React from 'react';
import { render, screen } from '../../../test-utils';
import PageTransition from './PageTransition';

jest.useFakeTimers();

const MyComponent = () => <div>foo</div>;

it('should render correctly when in prop is false', () => {
    render(<PageTransition node={ <MyComponent /> } />);

    const element = screen.getByText('foo').parentNode;

    expect(element).toHaveClass('fade');
    expect(element).not.toHaveClass('exitDone');
    expect(element).toHaveStyle({ zIndex: '0' });
});

it('should render correctly when in prop is true', () => {
    render(<PageTransition node={ <MyComponent /> } in />);

    const element = screen.getByText('foo').parentNode;

    expect(element).toHaveClass('fade');
    expect(element).not.toHaveClass('enterDone');
    expect(element).toHaveStyle({ zIndex: '1' });
});

it('should animate in, calling onEntered correctly', () => {
    const handleEntered = jest.fn();

    const { rerender } = render(<PageTransition node={ <MyComponent /> } />);

    rerender(<PageTransition node={ <MyComponent /> } in onEntered={ handleEntered } />);

    const element = screen.getByText('foo').parentNode;

    expect(element).toHaveClass('enter');
    expect(element).toHaveClass('enterActive');
    expect(element).not.toHaveClass('enterDone');
    expect(handleEntered).toHaveBeenCalledTimes(0);

    jest.runAllTimers();

    expect(element).not.toHaveClass('enter');
    expect(element).not.toHaveClass('enterActive');
    expect(element).toHaveClass('enterDone');
    expect(handleEntered).toHaveBeenCalledTimes(1);
});

it('should animate out, calling onEntered correctly', () => {
    const handleExited = jest.fn();

    const { rerender } = render(<PageTransition node={ <MyComponent /> } in />);

    rerender(<PageTransition node={ <MyComponent /> } onExited={ handleExited } />);

    const element = screen.getByText('foo').parentNode;

    expect(element).toHaveClass('exit');
    expect(element).toHaveClass('exitActive');
    expect(element).not.toHaveClass('exitDone');
    expect(handleExited).toHaveBeenCalledTimes(0);

    jest.runAllTimers();

    expect(element).not.toHaveClass('exit');
    expect(element).not.toHaveClass('exitActive');
    expect(element).toHaveClass('exitDone');
    expect(handleExited).toHaveBeenCalledTimes(1);
});

it('should respect passed className', () => {
    const { container } = render(<PageTransition node={ <MyComponent /> } className="foo" />);

    expect(container.querySelector('.foo')).toBeInTheDocument();
});
