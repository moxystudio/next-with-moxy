/* eslint-disable no-restricted-imports */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { render, screen } from '@testing-library/react';
import AppTree from './AppTree';

it('should render children correctly', () => {
    render(
        <AppTree>
            <div>foo</div>
        </AppTree>,
    );

    screen.getByText('foo');
});

it('should correctly setup IntlProvider', () => {
    render(
        <AppTree>
            <FormattedMessage id="foo" />
        </AppTree>,
    );

    screen.getByText('foo');
});

it('should correctly setup IntlProvider with overrides', () => {
    const intlProvider = {
        messages: { foo: 'bar' },
    };

    render(
        <AppTree intlProvider={ intlProvider }>
            <FormattedMessage id="foo" />
        </AppTree>,
    );

    screen.getByText('bar');
});
