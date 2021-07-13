import { useMemo } from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports

// A hook that returns the page key, based on Router's asPath but without the query.
// This key is to be used in <LayoutTree />, to uniquely identify a page.
// You may use `depth` to specify the depth of the URL you are interested in.
// As an example, a depth of 1 for /foo/bar, will return /foo.

const usePageKey = () => {
    const { asPath } = useRouter();

    const pageKey = useMemo(() => {
        // Remove query string.
        const pageKey = asPath.replace(/\?.+/, '');

        return pageKey;
    }, [asPath]);

    return pageKey;
};

export default usePageKey;
