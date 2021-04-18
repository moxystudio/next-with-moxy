import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import Home, { getStaticProps } from './Home';

it('should render correctly', () => {
    render(<Home />);

    screen.getByText('home.title');
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
