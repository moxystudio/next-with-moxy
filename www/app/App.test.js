import React from 'react';

import { App } from './App';
import { renderWithIntl } from '../shared/tests/utils';

const Tree = (props) => (
    <App
        Component={ () => <div>Hello World</div> }
        { ...props } />
);

it('should render correctly', () => {
    const { container } = renderWithIntl(<Tree />);

    expect(container).toHaveTextContent('Hello World');
});

