import ReactGA from 'react-ga';

import registerGoogleTracking from './ga-tracking';

jest.mock('react-ga', () => ({
    initialize: jest.fn(),
    pageview: jest.fn(),
}));

const mockedRouter = {
    asPath: '/foo',
    events: {
        on: jest.fn(),
        off: jest.fn(),
    },
};

beforeEach(() => {
    process.env.GA_TRACKING_ID = '12345';
    jest.clearAllMocks();
});

it('should attach tracking events to router', () => {
    registerGoogleTracking(mockedRouter);

    expect(mockedRouter.events.on).toHaveBeenCalledTimes(1);
    expect(mockedRouter.events.on).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function));
});

it('should call changeHandler if the route changes', () => {
    registerGoogleTracking(mockedRouter);

    expect(mockedRouter.events.on).toHaveBeenCalledTimes(1);
    expect(mockedRouter.events.on.mock.calls[0][0]).toBe('routeChangeComplete');
    expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
    expect(ReactGA.pageview).toHaveBeenCalledWith(mockedRouter.asPath);

    const handler = mockedRouter.events.on.mock.calls[0][1];

    handler('/bar');
    expect(ReactGA.pageview).toHaveBeenCalledTimes(2);
    expect(ReactGA.pageview).toHaveBeenCalledWith('/bar');
});

it('should remove tracking events ', () => {
    registerGoogleTracking(mockedRouter)();

    expect(mockedRouter.events.off).toHaveBeenCalledTimes(1);
    expect(mockedRouter.events.off.mock.calls[0][0]).toBe('routeChangeComplete');
});

it('should do nothing if env var is not defined', () => {
    delete process.env.GA_TRACKING_ID;

    registerGoogleTracking(mockedRouter);

    expect(mockedRouter.events.on).toHaveBeenCalledTimes(0);
    expect(mockedRouter.events.off).toHaveBeenCalledTimes(0);
});
