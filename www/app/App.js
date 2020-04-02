import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import KeyboardOnlyOutlines from '@moxy/react-keyboard-only-outlines';
import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';
import { CookiesProvider } from 'react-cookie';
import nextIntlConfig from '../../intl';
import { MainLayout, CookieBanner } from '../shared/react';
import { initGTM, destroyGTM } from '../shared/utils/google-tag-manager';
import SEO_DATA from './App.data.js';

export const App = ({ Component, pageProps }) => {
    const handleCookieConsents = useCallback((cookieConsents) => {
        if (cookieConsents.includes('analytics')) {
            initGTM();
        } else {
            destroyGTM();
        }
    }, []);

    return (
        <CookiesProvider>
            <Head>
                <title>{ SEO_DATA.title }</title>
                <meta name="description" content={ SEO_DATA.description } />
                <meta name="keywords" content={ SEO_DATA.keywords.join(' ') } />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png?v=M4KN2GElyG" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=M4KN2GElyG" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=M4KN2GElyG" />
                <link rel="manifest" href="/favicons/site.webmanifest?v=M4KN2GElyG" />
                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=M4KN2GElyG" color="#5bbad5" />
                <link rel="shortcut icon" href="/favicons/favicon.ico?v=M4KN2GElyG" />
                <meta name="apple-mobile-web-app-title" content="{project-name}" />
                <meta name="application-name" content="{project-name}" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-config" content="/favicons/browserconfig.xml?v=M4KN2GElyG" />
                <meta name="theme-color" content="#ffffff" />
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

            <KeyboardOnlyOutlines />
            <CookieBanner onCookieConsents={ handleCookieConsents } />

            <LayoutTree
                Component={ Component }
                pageProps={ pageProps }
                defaultLayout={ <MainLayout /> } />
        </CookiesProvider>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
};

export default withNextIntlSetup(nextIntlConfig)(App);
