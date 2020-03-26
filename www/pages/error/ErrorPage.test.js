import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { AppTree } from '../../shared/test-utils/components';

it('should render internal server error when `statusCode` is not 404', () => {
    const { getByText } = render(
        <AppTree>
            <ErrorPage statusCode={ 500 } />
        </AppTree>,
    );

    expect(getByText('error.internal.title')).toBeInTheDocument();
    expect(getByText('error.return-to-home')).toBeInTheDocument();
});

it('should render not found error when `statusCode` is 404', () => {
    const { getByText } = render(
        <AppTree>
            <ErrorPage statusCode={ 404 } />
        </AppTree>,
    );

    expect(getByText('error.not-found.title')).toBeInTheDocument();
    expect(getByText('error.return-to-home')).toBeInTheDocument();
});

describe('getInitialProps', () => {
    it('should return `res.statusCode` as `statusCode` if only `res` is present in context', () => {
        const res = { statusCode: 500 };
        const err = undefined;

        expect(ErrorPage.getInitialProps({ res, err })).toEqual({ statusCode: 500 });
    });

    it('should return `err.statusCode` as `statusCode` if both `res` and `err` are present in context', () => {
        const res = { statusCode: 500 };
        const err = { statusCode: 502 };

        expect(ErrorPage.getInitialProps({ res, err })).toEqual({ statusCode: 502 });
    });

    it('should return 404 as `statusCode` if both res and err are missing from context', () => {
        const res = undefined;
        const err = undefined;

        expect(ErrorPage.getInitialProps({ res, err })).toEqual({ statusCode: 404 });
    });
});
