import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import AppTree from '../../shared/test-utils/modules/react-app-tree';

it('should render correctly', () => {
    const { container } = render(<AppTree><Home /></AppTree>);

    expect(container).toHaveTextContent('home.title');
});
