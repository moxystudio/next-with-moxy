import React from 'react';
import { FormattedMessage } from 'react-intl';

import { renderWithIntl } from './render-with-intl';

it('should correctly render formatted message', () => {
    const { container, getByText } = renderWithIntl(
        <FormattedMessage id="foo" />,
    );

    expect(container.innerHTML).toMatchSnapshot();
    expect(getByText('foo')).toBeInTheDocument();
});

it('should correctly rerender with passed children', () => {
    const { rerenderWithIntl, getByText } = renderWithIntl(
        <FormattedMessage id="foo" />,
    );

    rerenderWithIntl('bar');

    expect(getByText('bar')).toBeInTheDocument();
});
