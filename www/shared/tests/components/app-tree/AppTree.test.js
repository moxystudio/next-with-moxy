import React from 'react';
import { FormattedMessage } from 'react-intl';
import { render } from '@testing-library/react';
import AppTree from './AppTree';

it('should render children correctly', () => {
    const { container } = render(
        <AppTree>
            <div>foo</div>
        </AppTree>,
    );

    expect(container).toHaveTextContent('foo');
});

it('should correctly setup IntlProvider', () => {
    const { container } = render(
        <AppTree>
            <FormattedMessage id="foo" />
        </AppTree>,
    );

    expect(container).toHaveTextContent('foo');
});

it('should correctly setup IntlProvider with overrides', () => {
    const intlProvider = {
        messages: { foo: 'bar' },
    };

    const { container } = render(
        <AppTree intlProvider={ intlProvider }>
            <FormattedMessage id="foo" />
        </AppTree>,
    );

    expect(container).toHaveTextContent('bar');
});
