import React from 'react';

import { App } from './App';
import { renderWithIntl } from '../shared/tests/utils';

const getTree = (props) => renderWithIntl(
    <App
        Component={ () => <div>Hello World</div> } // eslint-disable-line react/jsx-no-bind
        { ...props } />,
);

it('should render correctly', () => {
    const { container } = getTree();

    expect(container).toHaveTextContent('Hello World');
});

