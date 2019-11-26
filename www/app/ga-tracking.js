import ReactGA from 'react-ga';
import getConfig from 'next/config';

const { GA_TRACKING_ID } = getConfig().publicRuntimeConfig;

const registerGoogleTracking = (router) => {
    if (!GA_TRACKING_ID) {
        return () => {};
    }

    const handleRouteChange = (url) => ReactGA.pageview(url);

    ReactGA.initialize(GA_TRACKING_ID);
    ReactGA.pageview(router.asPath);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
    };
};

export default registerGoogleTracking;
