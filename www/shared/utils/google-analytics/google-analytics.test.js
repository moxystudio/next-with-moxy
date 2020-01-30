import Router from 'next/router';

const mockedRouter = {
    ...Router,
    replace: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
    },
};

describe('trackPageViews function', () => {
    beforeEach(() => {
        process.env.GA_TRACKING_ID = '12345';
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        jest.unmock('ganalytics');
    });

    it('should do nothing if env var is not defined', () => {
        const mockSend = jest.fn();

        jest.doMock('ganalytics', () => () => ({
            send: mockSend,
        }));

        delete process.env.GA_TRACKING_ID;

        const { trackPageViews } = require('.');

        trackPageViews(mockedRouter);

        expect(mockSend).toHaveBeenCalledTimes(0);
    });

    it('should replace route if utm parameters are included', () => {
        const { trackPageViews } = require('.');

        window.history.replaceState({}, 'Test UTM', '/?utm_source=foo&utm_medium=bar&utm_campaign=baz');

        trackPageViews(mockedRouter);
        expect(mockedRouter.replace).toHaveBeenCalledTimes(1);
        expect(mockedRouter.replace).toHaveBeenCalledWith('/');
    });

    it('should track page views whenever the route changes', () => {
        const mockSend = jest.fn();

        jest.doMock('ganalytics', () => () => ({
            send: mockSend,
        }));

        const { trackPageViews } = require('.');

        trackPageViews(mockedRouter);

        expect(mockedRouter.events.on).toHaveBeenCalledTimes(1);
        expect(mockedRouter.events.on).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));

        const handler = mockedRouter.events.on.mock.calls[0][1];

        handler();
        expect(mockSend).toHaveBeenCalledTimes(2);
        expect(mockSend).toHaveBeenCalledWith('pageview');
    });

    it('should remove router event handlers when cleaning up', () => {
        const { trackPageViews } = require('.');

        trackPageViews(mockedRouter)();

        expect(mockedRouter.events.off).toHaveBeenCalledTimes(1);
        expect(mockedRouter.events.off.mock.calls[0][0]).toBe('routeChangeStart');
    });
});

describe('exported ga module', () => {
    beforeEach(() => {
        process.env.GA_TRACKING_ID = '12345';
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('should export the ganalytics module if tracking id is provided', () => {
        const ganalytics = require('./google-analytics').default;

        expect(typeof ganalytics.send).toBe('function');
        expect(typeof ganalytics.args).toBe('object');
        expect(ganalytics).not.toHaveProperty('_mock');
    });

    it('should export the mocked ganalytics module if tracking id is provided', () => {
        delete process.env.GA_TRACKING_ID;

        const ganalytics = require('./google-analytics').default;

        expect(typeof ganalytics.send).toBe('function');
        expect(typeof ganalytics.args).toBe('object');
        expect(ganalytics).toHaveProperty('_mock');
    });
});

