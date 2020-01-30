import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import { App } from './App';
import { AppTreeWrapper } from '../shared/tests';

it('should render correctly', () => {
    const { container } = render(
        <AppTreeWrapper>
            <App Component={ () => 'Hello World' } router={ Router } />
        </AppTreeWrapper>,
    );

    expect(container).toHaveTextContent('Hello World');
});
