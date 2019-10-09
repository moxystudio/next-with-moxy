import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import keyboardOnlyOutlines from 'keyboard-only-outlines';
import ReactGA from 'react-ga';
import getConfig from 'next/config';
import favicon from '../shared/media/favicons/favicon.ico';
import SEO_DATA from './App.data';

import '../shared/styles/index.css';

const { publicRuntimeConfig } = getConfig();

export default class App extends NextApp {
    componentDidMount() {
        keyboardOnlyOutlines();

        // Initialize Google Analytics
        if (publicRuntimeConfig.NEXT_PUBLIC_GA_TRACKING_ID) {
            ReactGA.initialize(publicRuntimeConfig.NEXT_PUBLIC_GA_TRACKING_ID);
            ReactGA.pageview(this.props.router.asPath);

            this.props.router.events.one('routeChangeComplete', this.handleRouteChange);
        }
    }

    componentWillUnmount() {
        if (publicRuntimeConfig.NEXT_PUBLIC_GA_TRACKING_ID) {
            this.props.router.events.off('routeChangeComplete', this.handleRouteChange);
        }
    }

    handleRouteChange = (url) => {
        if (publicRuntimeConfig.NEXT_PUBLIC_GA_TRACKING_ID) {
            ReactGA.pageview(url);
        }
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>{ SEO_DATA.title }</title>
                    <meta name="description" content={ SEO_DATA.description } />
                    <meta name="keywords" content={ SEO_DATA.keywords.join(' ') } />
                    <link rel="shortcut icon" type="image/x-icon" href={ favicon } />
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
