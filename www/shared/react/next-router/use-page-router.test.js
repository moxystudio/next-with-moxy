import React from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import { render } from '../testing-library';
import usePageRouter from './use-page-router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

beforeEach(() => {
    useRouter.mockImplementation(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    }));
});

it('should return the same router it started with', () => {
    let router;

    const MyComponent = () => {
        router = usePageRouter();

        return null;
    };

    const { rerender } = render(<MyComponent />, { wrapper: undefined });

    expect(router).toEqual({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    });

    useRouter.mockImplementation(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    }));

    rerender(<MyComponent />);

    expect(router).toEqual({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    });

    useRouter.mockImplementation(() => ({
        pathname: '/about',
        asPath: '/about',
    }));

    rerender(<MyComponent />);

    expect(router).toEqual({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    });
});

it('should respect depth', () => {
    let router;

    const MyComponent = () => {
        router = usePageRouter(1);

        return null;
    };

    const { rerender } = render(<MyComponent />, { wrapper: undefined });

    expect(router).toEqual({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    });

    useRouter.mockImplementation(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    }));

    rerender(<MyComponent />);

    expect(router).toEqual({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    });

    useRouter.mockImplementation(() => ({
        pathname: '/about',
        asPath: '/about',
    }));

    rerender(<MyComponent />);

    expect(router).toEqual({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    });
});
