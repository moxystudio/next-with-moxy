import React from 'react';
import MainLayout from './MainLayout';
import { render } from '../../test-utils';

it('should render correctly', () => {
    const { container } = render(
        <MainLayout>
            <p className="hello">Hello!</p>
        </MainLayout>,
    );

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('main')).toContainElement(container.querySelector('.hello'));
});
