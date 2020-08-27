import React from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import { render } from '../../test-utils';
import usePageRouter from './use-page-router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    })),
}));

it('should return the same router it started with', () => {
    expect.assertions(2);

    const MyComponent = () => {
        const router = usePageRouter();

        expect(router).toEqual({
            pathname: '/blog/[name]',
            asPath: '/blog/foo?baz=1',
            query: { name: 'foo', baz: 1 },
        });

        return null;
    };

    const { rerender } = render(<MyComponent />, { wrapper: undefined });

    useRouter.mockImplementationOnce(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    }));

    rerender(<MyComponent />);
});
