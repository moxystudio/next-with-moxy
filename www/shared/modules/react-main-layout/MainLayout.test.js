import React from 'react';
import { render } from '../../test-utils';
import MainLayout from './MainLayout';

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
