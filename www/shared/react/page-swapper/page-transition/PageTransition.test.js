import React from 'react';
import { render, screen } from '../../testing-library';
import PageTransition from './PageTransition';

jest.useFakeTimers();

const MyComponent = () => <div>foo</div>;

it('should render correctly when in prop is false', () => {
    render(<PageTransition><MyComponent /></PageTransition>);

    const element = screen.getByText('foo').parentNode;

    expect(element).toHaveClass('fade');
    expect(element).not.toHaveClass('exitDone');
});

it('should render correctly when in prop is true', () => {
    render(<PageTransition in><MyComponent /></PageTransition>);

    const element = screen.getByText('foo').parentNode;

    expect(element).toHaveClass('fade');
    expect(element).not.toHaveClass('enterDone');
});

it('should animate in, calling onEntered correctly', () => {
    const handleEntered = jest.fn();

    const { rerender } = render(<PageTransition><MyComponent /></PageTransition>);

    rerender(<PageTransition in onEntered={ handleEntered }><MyComponent /></PageTransition>);

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

    const { rerender } = render(<PageTransition in><MyComponent /></PageTransition>);

    rerender(<PageTransition onExited={ handleExited }><MyComponent /></PageTransition>);

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
    const { container } = render(<PageTransition className="foo"><MyComponent /></PageTransition>);

    expect(container.querySelector('.foo')).toBeInTheDocument();
});
