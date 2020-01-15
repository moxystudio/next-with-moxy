import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../../../intl/messages/en-US.json';
import Home from './Home';

const Tree = (props) => (
    <IntlProvider locale="en-US" messages={ messages }>
        { props.children }
    </IntlProvider>
);

it('should render correctly', () => {
    const { container } = render(<Tree><Home /></Tree>);

    expect(container).toHaveTextContent('Home');
});
