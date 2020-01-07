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

// const getTree = (props) => render(<GoogleAnalytics router={ mockedRouter } { ...props } />);

describe('Google Analytics', () => {
    beforeAll(() => {
        process.env.GA_TRACKING_ID = '12345';
    });

    beforeEach(() => {
        ReactGA.initialize.mockReset();
        ReactGA.pageview.mockReset();
        mockedRouter.events.on.mockReset();
        mockedRouter.events.off.mockReset();
    });

    it('should attach tracking events to router', () => {
        registerGoogleTracking(mockedRouter);

        expect(mockedRouter.events.on).toHaveBeenCalledTimes(1);
        expect(mockedRouter.events.on).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function));
    });

    it('should register a page view if the route changes', () => {
        let on;
        const router = {
            ...mockedRouter,
            events: {
                ...mockedRouter.events,
                on: jest.fn((event, handler) => {
                    on = handler;
                }),
            },
        };

        registerGoogleTracking(router);

        expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
        expect(ReactGA.pageview).toHaveBeenCalledWith(router.asPath);

        ReactGA.pageview.mockReset();
        on('/bar');

        expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
        expect(ReactGA.pageview).toHaveBeenCalledWith('/bar');
    });

    it('should remove tracking events ', () => {
        registerGoogleTracking(mockedRouter)();

        expect(mockedRouter.events.off).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if env var is not defined', () => {
        delete process.env.GA_TRACKING_ID;

        registerGoogleTracking(mockedRouter);

        expect(mockedRouter.events.on).toHaveBeenCalledTimes(0);
        expect(mockedRouter.events.off).toHaveBeenCalledTimes(0);
    });
});
