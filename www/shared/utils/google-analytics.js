import ganalytics from 'ganalytics';
const ga = typeof window !== 'undefined' && process.env.GA_TRACKING_ID ?
    ganalytics(process.env.GA_TRACKING_ID, {}, true) :
    { send: () => {} };

export const trackOnRouteChanged = (router) => {
    const handleRouteChange = () => ga.send('pageview');

    handleRouteChange();

    if (window.location.search.includes('utm_')) {
        router.replace('/');
    }

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
        router.events.off('routeChangeStart', handleRouteChange);
    };
};

export default ga;
