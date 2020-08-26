import React from 'react';
import { render, screen } from '../../test-utils';
import MainLayout from './MainLayout';

const Page = ({ children }) => children;

it('should render correctly', () => {
    const { container } = render(
        <MainLayout>
            <Page>
                <main className="hello">Hello!</main>
            </Page>
        </MainLayout>,
    );

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    screen.getByText('Hello!');
});
