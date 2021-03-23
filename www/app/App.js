import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import KeyboardOnlyOutlines from '@moxy/react-keyboard-only-outlines';
import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';
import { RouterScrollProvider } from '@moxy/next-router-scroll';
import Seo from '@moxy/next-seo';
import nextIntlConfig from '../../intl';
import PageSwapper from '../shared/react/page-swapper';
import MainLayout from '../shared/react/main-layout';
import { usePageKey } from '../shared/react/next-router';
import { initGTM, destroyGTM } from '../shared/utils/google-tag-manager';
import CookieBanner from './cookie-banner';
import { seoData } from './App.data.js';

export const AppInner = ({ Component, pageProps }) => {
    const pageKey = usePageKey();

    const handleCookieConsents = useCallback((cookieConsents) => {
        if (cookieConsents.includes('analytics')) {
            initGTM();
        } else {
            destroyGTM();
        }
    }, []);

    return (
        <>
            <Head>
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
            </Head>
            <Seo data={ seoData } />

            <KeyboardOnlyOutlines />
            <CookieBanner onConsents={ handleCookieConsents } />

            <LayoutTree
                Component={ Component }
                pageProps={ pageProps }
                pageKey={ pageKey }
                defaultLayout={ <MainLayout /> }>
                { (tree) => <PageSwapper node={ tree } nodeKey={ tree.key } /> }
            </LayoutTree>
        </>
    );
};

AppInner.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export const App = (props) => (
    <RouterScrollProvider>
        <AppInner { ...props } />
    </RouterScrollProvider>
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default withNextIntlSetup(nextIntlConfig)(App);
