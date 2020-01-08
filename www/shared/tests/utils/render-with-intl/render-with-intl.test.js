import React from 'react';
import { FormattedMessage } from 'react-intl';

import { renderWithIntl } from './render-with-intl';

it('should correctly render formatted message', () => {
    const { getByText } = renderWithIntl(
        <FormattedMessage id="foo" />,
    );

    expect(getByText('foo')).toBeInTheDocument();
});

it('should correctly rerender with passed children', () => {
    const { rerenderWithIntl, getByText } = renderWithIntl(
        <FormattedMessage id="foo" />,
    );

    rerenderWithIntl('bar');

    expect(getByText('bar')).toBeInTheDocument();
});
