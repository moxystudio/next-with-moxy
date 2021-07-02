import { useRef } from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import usePageKey from './use-page-key';

// You should use this hook instead of useRouter() provided by Next.js because it
// returns the correct router even during page transitions. During the transition,
// the old page will still be mounted when animating out, but the router has already changed.
// This hook returns the same router your page started with.

const usePageRouter = (depth) => {
    const pageKey = usePageKey(depth);
    const router = useRouter();

    const routerRef = useRef(router);
    const pageKeyRef = useRef(pageKey);

    if (pageKeyRef.current === pageKey) {
        pageKeyRef.current = pageKey;
        routerRef.current = router;
    }

    return routerRef.current;
};

export default usePageRouter;
