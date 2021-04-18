import React from 'react';
import { render, screen } from '../../shared/react/testing-library';
import Contacts, { getStaticProps } from './Contacts';

it('should render correctly', () => {
    render(<Contacts />);

    screen.getByText('contacts.title');
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
