import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import Terms, { getStaticProps } from './Terms';

it('should render correctly', () => {
    render(<Terms />);

    expect(screen.getByText('terms.title')).toBeInTheDocument();
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
