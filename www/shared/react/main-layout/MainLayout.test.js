import React from 'react';
import { render, screen } from '../testing-library';
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

it('should respect passed className', () => {
    const { container } = render(
        <MainLayout className="foo">
            <Page>
                <main className="hello">Hello!</main>
            </Page>
        </MainLayout>,
    );

    expect(container.querySelector('.foo')).toBeTruthy();
});
