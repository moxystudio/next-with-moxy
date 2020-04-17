import React from 'react';
import { render } from '@testing-library/react';
import WaitForReact from '@moxy/react-wait-for-react';
import SplashScreen from './SplashScreen';
import AppTree from '../../test-utils/modules/react-app-tree';

jest.mock('@moxy/react-wait-for-react', () => jest.fn(() => null));

it('should render the content and progress bar correctly when progress is 0', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0, error: undefined }));

    const { container } = render(<AppTree><SplashScreen /></AppTree>);

    expect(container).not.toHaveTextContent('error');
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]')).toHaveStyle({ transform: 'scaleX(0)' });
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).not.toHaveClass('loading', 'loaded');
});

it('should render the content and progress bar correctly when progress is between 0 and 1', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0.2, error: undefined }));

    const { container } = render(<AppTree><SplashScreen /></AppTree>);

    expect(container).not.toHaveTextContent('error');
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]')).toHaveStyle({ transform: 'scaleX(0.2)' });
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).toHaveClass('loading');
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).not.toHaveClass('loaded');
});

it('should render the content and progress bar correctly when progress is 1', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 1, error: undefined }));

    const { container } = render(<AppTree><SplashScreen /></AppTree>);

    expect(container).not.toHaveTextContent('error');
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]')).toHaveStyle({ transform: 'scaleX(1)' });
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).toHaveClass('loaded');
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).not.toHaveClass('loading');
});

it('should render an error if the promise failed', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0.2, error: new Error('foo') }));

    const { container } = render(<AppTree><SplashScreen /></AppTree>);

    expect(container).toHaveTextContent('error');
    expect(container.querySelector('[data-wait-for-react-element="progressBar"]')).toHaveStyle({ transform: 'scaleX(0.2)' });
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).toHaveClass('loading');
    expect(container.querySelector('[data-wait-for-react-element="splashScreen"]')).not.toHaveClass('loaded');
});
