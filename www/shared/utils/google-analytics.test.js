import Router from 'next/router';

const mockedRouter = {
    ...Router,
    replace: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
    },
};

beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    process.env.GA_TRACKING_ID = '12345';
});

it('should do nothing if env var is not defined', () => {
    const mockSend = jest.fn();

    jest.mock('ganalytics', () => () => ({
        send: mockSend,
    }));

    delete process.env.GA_TRACKING_ID;
    const { trackOnRouteChanged } = require('./google-analytics');

    trackOnRouteChanged(mockedRouter);

    expect(mockSend).toHaveBeenCalledTimes(0);
});

it('should replace route if utm parameters are included', () => {
    const { trackOnRouteChanged } = require('./google-analytics');

    window.history.replaceState({}, 'Test UTM', '/?utm_source=foo&utm_medium=bar&utm_campaign=baz');

    trackOnRouteChanged(mockedRouter);
    expect(mockedRouter.replace).toHaveBeenCalledTimes(1);
    expect(mockedRouter.replace).toHaveBeenCalledWith('/');
});

it('should attach tracking events to router', () => {
    const { trackOnRouteChanged } = require('./google-analytics');

    trackOnRouteChanged(mockedRouter);

    expect(mockedRouter.events.on).toHaveBeenCalledTimes(1);
    expect(mockedRouter.events.on).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));
});

it('should call handleRouteChange if the route changes', () => {
    const mockSend = jest.fn();

    jest.mock('ganalytics', () => () => ({
        send: mockSend,
    }));

    const { trackOnRouteChanged } = require('./google-analytics');

    trackOnRouteChanged(mockedRouter);

    expect(mockedRouter.events.on).toHaveBeenCalledTimes(1);
    expect(mockedRouter.events.on.mock.calls[0][0]).toBe('routeChangeStart');

    const handler = mockedRouter.events.on.mock.calls[0][1];

    handler();
    expect(mockSend).toHaveBeenCalledTimes(2);
});

it('should remove tracking events ', () => {
    const { trackOnRouteChanged } = require('./google-analytics');

    trackOnRouteChanged(mockedRouter)();

    expect(mockedRouter.events.off).toHaveBeenCalledTimes(1);
    expect(mockedRouter.events.off.mock.calls[0][0]).toBe('routeChangeStart');
});

