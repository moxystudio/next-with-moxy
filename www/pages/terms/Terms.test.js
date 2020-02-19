import React from 'react';
import { render } from '@testing-library/react';
import Terms from './Terms';

it('should render correctly', () => {
    const { container } = render(<Terms />);

    expect(container).toHaveTextContent('Terms and Conditions');
});
