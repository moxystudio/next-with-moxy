import seoImage from '../shared/media/images/seo.png';

export const data = {
    url: process.env.SITE_URL,
    title: '{project-name}',
    description: '{project-description}',
    keywords: [
        '{project-keyword-1}',
        '{project-keyword-2}',
    ],
    image: { src: `${process.env.SITE_URL}${seoImage}`, width: 1200, height: 630 },
};

export const seoData = {
    title: data.title,
    meta: [
        { name: 'description', content: data.description },
        { name: 'keywords', content: data.keywords.join(' ') },
        /* Facebook & search engines */
        { property: 'og:url', content: data.url },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: data.title },
        { property: 'og:description', content: data.description },
        { property: 'og:site_name', content: data.title },
        { property: 'og:image', content: data.image.src },
        { property: 'og:image:width', content: data.image.width },
        { property: 'og:image:height', content: data.image.height },
        /* Twitter */
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: data.url },
        { name: 'twitter:title', content: data.title },
        { name: 'twitter:description', content: data.description },
        { name: 'twitter:image', content: data.image.src },
    ],
};

export default data;
