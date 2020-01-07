import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { merge } from 'lodash';

import defaultMessages from '../../../../../intl/messages/en-US.json';
import testMessages from '../../../../../intl/messages/test.json';

export const renderWithIntl = (
    children,
    options = {},
    id = 'en-US',
    locale = 'en',
    messages = merge(defaultMessages, testMessages)) => {
    const { rerender, ...rest } = render(
        <IntlProvider id={ id } locale={ locale } messages={ messages }>
            { children }
        </IntlProvider>,
        options);

    return { ...rest,
        rerenderWithIntl: (children) => {
            rerender(
                <IntlProvider id={ id } locale={ locale } messages={ defaultMessages }>
                    { children }
                </IntlProvider>);
        } };
};

export default renderWithIntl;
