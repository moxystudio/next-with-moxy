import React from 'react';
import BaseApp from 'next/app';
import Head from 'next/head';
import keyboardOnlyOutlines from 'keyboard-only-outlines';
import ReactGA from 'react-ga';

import seoImage from '../shared/media/images/seo.png';

import '../shared/styles/index.css';

const SEO_DATA = {
    url: 'https://{project-domain}',
    title: '{project-name}',
    description: '{project-description}',
    keywords: ['{project-keyword-1}', '{project-keyword-2}'],
    image: { src: seoImage, width: 1200, height: 630 },
};

class App extends BaseApp {
    componentDidMount() {
        keyboardOnlyOutlines();

        // Initialize Google Analytics
        if (process.env.REACT_APP_GA_TRACKING_ID) {
            ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>{ SEO_DATA.title }</title>
                    <meta name="description" content={ SEO_DATA.description } />
                    <meta name="keywords" content={ SEO_DATA.keywords.join(' ') } />
                    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
                    {/* Facebook & search engines */}
                    <meta property="og:url" content={ SEO_DATA.url } />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={ SEO_DATA.title } />
                    <meta property="og:description" content={ SEO_DATA.description } />
                    <meta property="og:site_name" content={ SEO_DATA.title } />
                    <meta property="og:image" content={ SEO_DATA.image.src } />
                    <meta property="og:image:width" content={ SEO_DATA.image.width } />
                    <meta property="og:image:height" content={ SEO_DATA.image.height } />
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={ SEO_DATA.url } />
                    <meta property="twitter:title" content={ SEO_DATA.title } />
                    <meta property="twitter:description" content={ SEO_DATA.description } />
                    <meta property="twitter:image" content={ SEO_DATA.image.src } />
                </Head>
                <Component { ...pageProps } />
            </>
        );
    }
}

export default App;
