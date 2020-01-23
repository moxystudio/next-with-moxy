import React from 'react';
import { render } from '@testing-library/react';
import WaitForReact from '@moxy/react-wait-for-react';
import SplashScreen from './SplashScreen';
import { AppTree } from '../../tests';

jest.mock('@moxy/react-wait-for-react', () => jest.fn(({ children }) => children({ progress: 0.2, error: undefined })));

it('should render the content and progress bar', () => {
    const { container } = render(<AppTree><SplashScreen /></AppTree>);

    expect(container).not.toHaveTextContent('error');
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]')).toBeInstanceOf(HTMLElement);
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]').style.transform).toContain('scaleX(0.2)');
});

it('should render an error if the promise failed', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0.2, error: new Error('foo') }));

    const { container } = render(<AppTree><SplashScreen /></AppTree>);

    expect(container).toHaveTextContent('error');
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]')).toBeInstanceOf(HTMLElement);
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]').style.transform).toContain('scaleX(0.2)');
});
