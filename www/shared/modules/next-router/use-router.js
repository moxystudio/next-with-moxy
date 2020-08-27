import { useRef } from 'react';
import { useRouter as useNextRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import usePageKey from './use-page-key';

// You should use this hook instead of the one provided by Next.js because it
// returns the correct router even during page transitions. During the transition,
// the old page will still be mounted when animating out, but the router has already changed.
// This hook returns the same router your page started with.

const useRouter = () => {
    const pageKey = usePageKey();
    const router = useNextRouter();

    const routerRef = useRef(router);
    const pageKeyRef = useRef(pageKey);

    if (pageKeyRef.current === pageKey) {
        pageKeyRef.current = pageKey;
        routerRef.current = router;
    }

    return routerRef.current;
};

export default useRouter;
