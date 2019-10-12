import ReactGA from 'react-ga';

const registerGoogleTracking = (router) => {
    if (!process.env.GA_TRACKING_ID) {
        return () => {};
    }

    const handleRouteChange = (url) => ReactGA.pageview(url);

    ReactGA.initialize(process.env.GA_TRACKING_ID);
    ReactGA.pageview(router.asPath);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
    };
};

export default registerGoogleTracking;
