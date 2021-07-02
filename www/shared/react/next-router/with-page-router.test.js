import React, { Component, createRef } from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import { render, screen } from '../testing-library';
import withPageRouter from './with-page-router';

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

it('should inject pageRouter prop', () => {
    expect.assertions(1);

    const MyComponent = withPageRouter()(({ pageRouter }) => {
        expect(pageRouter).toEqual({
            pathname: '/blog/[name]',
            asPath: '/blog/foo?baz=1',
            query: { name: 'foo', baz: 1 },
        });

        return null;
    });

    render(<MyComponent />, { wrapper: undefined });
});

it('should respect depth', () => {
    const MyComponent = withPageRouter(1)(({ pageRouter }) => pageRouter.asPath);

    const { rerender } = render(<MyComponent />, { wrapper: undefined });

    screen.getByText('/blog/foo?baz=1');

    useRouter.mockImplementation(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    }));

    rerender(<MyComponent />);

    screen.getByText('/blog/bar?baz=1');

    useRouter.mockImplementation(() => ({
        pathname: '/about',
        asPath: '/about',
    }));

    rerender(<MyComponent />);

    screen.getByText('/blog/bar?baz=1');
});

it('should forward refs', () => {
    class MyComponent extends Component {
        render() {
            return null;
        }

        handleClick = () => {};
    }

    const EnhancedMyComponent = withPageRouter()(MyComponent);

    const ref = createRef();

    render(<EnhancedMyComponent ref={ ref } />, { wrapper: undefined });

    expect(ref.current.handleClick).toBeDefined();
});

it('should copy statics', () => {
    const MyComponent = () => {};

    MyComponent.foo = 'bar';

    const EnhancedMyComponent = withPageRouter()(MyComponent);

    expect(EnhancedMyComponent.foo).toBe('bar');
});
