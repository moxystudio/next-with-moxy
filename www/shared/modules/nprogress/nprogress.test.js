import { wrap } from 'lodash';
import Router from 'next/router';
import NProgress from 'nprogress';
import NProgressFacade, { subscribeToRouter } from './nprogress';

jest.mock('nprogress', () => ({
    configure: jest.fn(),
    start: jest.fn(),
    done: jest.fn(),
}));

jest.mock('next/router', () => ({
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
}));

jest.useFakeTimers();

let counter = 0;

const start = wrap(NProgressFacade.start, (start) => {
    counter += 1;
    start();
});

const done = wrap(NProgressFacade.done, (done) => {
    counter -= 1;
    done();
});

afterEach(() => {
    // Reset all pending start calls.
    // eslint-disable-next-line no-unmodified-loop-condition
    while (counter > 0) {
        done();
    }

    NProgress.start.mockClear();
    NProgress.done.mockClear();
});

describe('.start() facade', () => {
    it('should wait a bit before calling NProgress.start()', () => {
        start();

        expect(NProgress.start).not.toHaveBeenCalled();
        jest.runAllTimers();
        expect(NProgress.start).toHaveBeenCalledTimes(1);
    });

    it('should not call NProgress.start() two times', () => {
        start();
        start();

        jest.runAllTimers();
        expect(NProgress.start).toHaveBeenCalledTimes(1);
    });
});

describe('.done() facade', () => {
    it('should not call NProgress.done() two times', () => {
        start();
        start();
        jest.runAllTimers();
        done();
        done();

        jest.runAllTimers();
        expect(NProgress.done).toHaveBeenCalledTimes(1);
    });

    it('should cancel any pending NProgress.start() calls', () => {
        start();
        done();

        jest.runAllTimers();
        expect(NProgress.start).toHaveBeenCalledTimes(0);
    });
});

describe('subscribeToRouter()', () => {
    beforeAll(() => {
        subscribeToRouter();
    });

    it('should subscribe to router events', () => {
        expect(Router.events.on).toHaveBeenCalledTimes(3);
        expect(Router.events.on).toHaveBeenNthCalledWith(1, 'routeChangeStart', NProgressFacade.start);
        expect(Router.events.on).toHaveBeenNthCalledWith(2, 'routeChangeComplete', NProgressFacade.done);
        expect(Router.events.on).toHaveBeenNthCalledWith(3, 'routeChangeError', NProgressFacade.done);
    });

    it('should not subscribe twice to router events', () => {
        subscribeToRouter();

        expect(Router.events.on).toHaveBeenCalledTimes(3);
    });
});
