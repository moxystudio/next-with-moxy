import React, { Component, createRef } from 'react';
import { render } from '../../test-utils';
import withPageRouter from './with-page-router';

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    })),
}));

it('should inject pageRouter prop', () => {
    expect.assertions(1);

    const MyComponent = withPageRouter(({ pageRouter }) => {
        expect(pageRouter).toEqual({
            pathname: '/blog/[name]',
            asPath: '/blog/foo?baz=1',
            query: { name: 'foo', baz: 1 },
        });

        return null;
    });

    render(<MyComponent />, { wrapper: undefined });
});

it('should forward refs', () => {
    class MyComponent extends Component {
        render() {
            return null;
        }

        handleClick = () => {};
    }

    const EnhancedMyComponent = withPageRouter(MyComponent);

    const ref = createRef();

    render(<EnhancedMyComponent ref={ ref } />, { wrapper: undefined });

    expect(ref.current.handleClick).toBeDefined();
});

it('should copy statics', () => {
    const MyComponent = () => {};

    MyComponent.foo = 'bar';

    const EnhancedMyComponent = withPageRouter(MyComponent);

    expect(EnhancedMyComponent.foo).toBe('bar');
});
