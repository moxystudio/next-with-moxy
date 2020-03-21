import React from 'react';
import { render } from '@testing-library/react';
import MainLayout from './MainLayout';
import { AppTree } from '../../test-utils';

it('should render correctly', () => {
    const { container } = render((
        <AppTree>
            <MainLayout>
                <p className="hello">Hello!</p>
            </MainLayout>
        </AppTree>
    ));

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('main')).toContainElement(container.querySelector('.hello'));
});
