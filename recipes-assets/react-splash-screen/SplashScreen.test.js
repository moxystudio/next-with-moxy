import React from 'react';
import WaitForReact from '@moxy/react-wait-for-react';
import { render, screen } from '../../test-utils';
import SplashScreen from './SplashScreen';

jest.mock('@moxy/react-wait-for-react', () => jest.fn(() => null));

it('should render the content and progress bar correctly when progress is 0', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0, error: undefined }));

    const { getByDataWaitForReactElement } = render(<SplashScreen />);

    screen.getByText('error');
    expect(getByDataWaitForReactElement('progressBar')).toHaveStyle({ transform: 'scaleX(0)' });
    expect(getByDataWaitForReactElement('splashScreen')).not.toHaveClass('loading', 'loaded');
});

it('should render the content and progress bar correctly when progress is between 0 and 1', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0.2, error: undefined }));

    const { getByDataWaitForReactElement } = render(<SplashScreen />);

    screen.getByText('error');
    expect(getByDataWaitForReactElement('progressBar')).toHaveStyle({ transform: 'scaleX(0.2)' });
    expect(getByDataWaitForReactElement('splashScreen')).toHaveClass('loading');
    expect(getByDataWaitForReactElement('splashScreen')).not.toHaveClass('loaded');
});

it('should render the content and progress bar correctly when progress is 1', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 1, error: undefined }));

    const { getByDataWaitForReactElement } = render(<SplashScreen />);

    screen.getByText('error');
    expect(getByDataWaitForReactElement('progressBar')).toHaveStyle({ transform: 'scaleX(1)' });
    expect(getByDataWaitForReactElement('splashScreen')).toHaveClass('loaded');
    expect(getByDataWaitForReactElement('splashScreen')).not.toHaveClass('loading');
});

it('should render an error if the promise failed', () => {
    WaitForReact.mockImplementationOnce(({ children }) => children({ progress: 0.2, error: new Error('foo') }));

    const { getByDataWaitForReactElement } = render(<SplashScreen />);

    screen.getByText('error');
    expect(getByDataWaitForReactElement('progressBar')).toHaveStyle({ transform: 'scaleX(0.2)' });
    expect(getByDataWaitForReactElement('splashScreen')).toHaveClass('loading');
    expect(getByDataWaitForReactElement('splashScreen')).not.toHaveClass('loaded');
});
