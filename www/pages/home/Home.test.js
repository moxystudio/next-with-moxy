import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../../../intl/messages/en-US.json';
import Home from './Home';

const renderTree = (children) => render(
    <IntlProvider locale="en-US" messages={ messages }>
        { children }
    </IntlProvider>,
);

it('should render correctly', () => {
    const { container } = renderTree(<Home />);

    expect(container).toHaveTextContent('Home');
});
