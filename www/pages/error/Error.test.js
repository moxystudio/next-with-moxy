import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import ErrorPage, { getStaticProps } from './Error';

it('should render internal server error when `type` is 500', () => {
    render(<ErrorPage type="500" />);

    screen.getByText('error.internal.title');
    screen.getByText('error.return-to-home');
});

it('should render not found error when `type` is 404', () => {
    render(<ErrorPage type="404" />);

    screen.getByText('error.not-found.title');
    screen.getByText('error.return-to-home');
});

describe('getStaticProps()', () => {
    it('should return the needed props', async () => {
        await expect(getStaticProps({ locale: 'en' })).resolves.toEqual({
            props: {
                intl: {
                    messages: {},
                },
            },
        });
    });
});
