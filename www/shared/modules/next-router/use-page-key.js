import { useMemo } from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports

// A hook that returns the page key, based on `location.pathname`.
// This key is to be used in <LayoutTree />, to uniquely identify a page.

const usePageKey = () => {
    const { asPath } = useRouter();

    const pageKey = useMemo(() => asPath.replace(/\?.+/, ''), [asPath]); // Remove query string

    return pageKey;
};

export default usePageKey;
