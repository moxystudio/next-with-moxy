import React from 'react';
import { render } from '@testing-library/react';
import ProjectInfo from './ProjectInfo';
import AppTree from '../../../shared/test-utils/modules/react-app-tree';

it('should render correctly', () => {
    const { container } = render(<AppTree><ProjectInfo name="foo" email="bar" /></AppTree>);

    expect(container).toHaveTextContent('contacts.name');
    expect(container).toHaveTextContent('contacts.email');
});
