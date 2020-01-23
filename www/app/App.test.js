import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import { AppTreeWrapper } from '../shared/tests';

it('should render correctly', () => {
    const { container } = render(
        <AppTreeWrapper>
            <App Component={ () => 'Hello World' } />
        </AppTreeWrapper>,
    );

    expect(container).toHaveTextContent('Hello World');
});
