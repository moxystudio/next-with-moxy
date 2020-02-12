import seoImage from '../shared/media/images/seo.png';

export default {
    url: process.env.SITE_URL,
    title: '{project-name}',
    description: '{project-description}',
    keywords: ['{project-keyword-1}', '{project-keyword-2}'],
    image: { src: `${process.env.SITE_URL}${seoImage}`, width: 1200, height: 630 },
};
