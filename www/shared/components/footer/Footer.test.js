import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { AppTree } from '../../test-utils/components';

it('should render correctly', () => {
    const { container } = render((
        <AppTree>
            <Footer />
        </AppTree>
    ));

    expect(container.querySelector('footer')).toBeInTheDocument();
});

it('should respect passed className', () => {
    const { container } = render((
        <AppTree>
            <Footer className="foo" />
        </AppTree>
    ));

    expect(container.querySelector('footer')).toHaveClass('foo');
});
