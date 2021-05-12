import { useIntl } from 'react-intl';
import { useRouter } from 'next/router'; // eslint-disable-line no-restricted-imports
import seoImage from './images/seo.jpg';

export const useSeoData = () => {
    const intl = useIntl();
    const { asPath } = useRouter();

    const url = `${process.env.SITE_URL}${asPath}`;
    const title = intl.formatMessage({ id: 'seo.title' });
    const description = intl.formatMessage({ id: 'seo.description' });
    const keywords = intl.formatMessage({ id: 'seo.keywords' });
    const image = {
        src: `${process.env.SITE_URL}${seoImage}`,
        width: 1200,
        height: 630,
    };

    return {
        title,
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            /* Facebook & search engines */
            { property: 'og:url', content: url },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image.src },
            { property: 'og:image:width', content: image.width },
            { property: 'og:image:height', content: image.height },
            /* Twitter */
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:url', content: url },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image.src },
        ],
    };
};
