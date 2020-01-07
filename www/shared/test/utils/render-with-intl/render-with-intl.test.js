import React from 'react';
import { FormattedMessage } from 'react-intl';

import { renderWithIntl } from './render-with-intl';

describe('Render with Intl', () => {
    it('should correctly render formatted message', () => {
        const { container, getByText } = renderWithIntl(
            <FormattedMessage id={ 'foo' } />,
        );

        expect(container.innerHTML).toMatchSnapshot();
        expect(getByText('foo')).toBeInTheDocument();
    });

    it('should correctly rerender', () => {
        const render = renderWithIntl(
            <FormattedMessage id={ 'foo' } />,
        );

        render.rerenderWithIntl('bar');

        expect(render.container.innerHTML).toMatchSnapshot();
    });
});
