import React from 'react';
import { render, screen, userEvent } from '../../shared/test-utils';
import ErrorPage from './ErrorPage';

it('should render internal server error when `statusCode` is not 404', () => {
    render(<ErrorPage statusCode={ 500 } />);

    screen.getByText('error.internal.title');
    screen.getByText('error.return-to-home');

    userEvent.click(screen.getByText('error.return-to-home'));
});

it('should render not found error when `statusCode` is 404', () => {
    render(<ErrorPage statusCode={ 404 } />);

    screen.getByText('error.not-found.title');
    screen.getByText('error.return-to-home');
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
