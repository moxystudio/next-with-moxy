import React from 'react';
import { render, screen, act } from '../testing-library';
import Debug from './Debug';

it('should render correctly', () => {
    render(<Debug />);

    screen.getByText('1');
    screen.getByText('2');
});

it('should make it visible when calling __TOGGLE_GRID_DEBUG__()', () => {
    const { container } = render(<Debug />);

    act(() => {
        window.__TOGGLE_GRID_DEBUG__();
    });

    expect(container.firstChild).toHaveClass('visible');
});
