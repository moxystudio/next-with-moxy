import { useEffect } from 'react';

// Temporary fix to avoid flash of unstyled content during route transitions.
// Keep an eye on this issue and remove this code when resolved: https://github.com/vercel/next.js/issues/17464
const useFossFix = () => useEffect(() => {
    document
        .querySelectorAll('head > link[rel="stylesheet"][data-n-p]')
        .forEach((node) => node.removeAttribute('data-n-p'));

    const mutationHandler = (mutations) => mutations
        .filter(({ target }) => target.nodeName === 'STYLE' && target.getAttribute('media') === 'x')
        .forEach(({ target }) => target.removeAttribute('media'));

    const observer = new MutationObserver(mutationHandler);

    observer.observe(document.head, {
        subtree: true,
        attributeFilter: ['media'],
    });

    return () => observer.disconnect();
}, []);

export default useFossFix;
