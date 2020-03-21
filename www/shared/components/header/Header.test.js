import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { AppTree } from '../../test-utils';

it('should render correctly', () => {
    const { container } = render((
        <AppTree>
            <Header />
        </AppTree>
    ));

    expect(container.querySelector('header')).toBeInTheDocument();
});

it('should respect passed className', () => {
    const { container } = render((
        <AppTree>
            <Header className="foo" />
        </AppTree>
    ));

    expect(container.querySelector('header')).toHaveClass('foo');
});
