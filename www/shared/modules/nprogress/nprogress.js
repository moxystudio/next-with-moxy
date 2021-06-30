import Router from 'next/router'; // eslint-disable-line no-restricted-imports
import NProgress from 'nprogress';

NProgress.configure({
    minimum: 0.2,
    speed: 300,
    trickleSpeed: 300,
    showSpinner: false,
});

const START_DELAY = 700;

let refCount = 0;
let startDelayTimeout;

const start = () => {
    refCount += 1;

    if (refCount === 1) {
        clearTimeout(startDelayTimeout);
        startDelayTimeout = setTimeout(() => NProgress.start(), START_DELAY);
    }
};

const done = () => {
    refCount -= 1;

    if (refCount === 0) {
        clearTimeout(startDelayTimeout);
        NProgress.done();
    }
};

let subscribedToRouter = false;

const subscribeToRouter = () => {
    if (typeof window !== 'undefined' && !subscribedToRouter) {
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', done);
        Router.events.on('routeChangeError', done);

        subscribedToRouter = true;
    }
};

export default { start, done };
export { subscribeToRouter };
