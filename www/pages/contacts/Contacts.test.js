import React from 'react';
import { render } from '@testing-library/react';
import Contacts from './Contacts';
import { AppTree } from '../../shared/test-utils/react';

it('should render correctly', () => {
    const { container } = render(<AppTree><Contacts /></AppTree>);

    expect(container).toHaveTextContent('contacts.title');
});
