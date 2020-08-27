import React from 'react';
import { useRouter as useNextRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import { render } from '../../test-utils';
import useRouter from './use-router';

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/foo?baz=1',
        query: { name: 'foo', baz: 1 },
    })),
}));

it('should return the same router it started with', () => {
    expect.assertions(2);

    const MyComponent = () => {
        const router = useRouter();

        expect(router).toEqual({
            pathname: '/blog/[name]',
            asPath: '/blog/foo?baz=1',
            query: { name: 'foo', baz: 1 },
        });

        return null;
    };

    const { rerender } = render(
        <MyComponent />,
        { wrapper: undefined },
    );

    useNextRouter.mockImplementationOnce(() => ({
        pathname: '/blog/[name]',
        asPath: '/blog/bar?baz=1',
        query: { name: 'bar', baz: 1 },
    }));

    rerender(
        <MyComponent />,
    );
});
