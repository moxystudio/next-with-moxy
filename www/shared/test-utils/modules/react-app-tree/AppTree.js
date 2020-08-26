import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { CookiesProvider } from 'react-cookie';
import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { LayoutTree } from '@moxy/next-layout';

export const AppTree = ({ intlProvider, cookiesProvider, routerScrollProvider, children }) => {
    intlProvider = {
        locale: 'en-US',
        messages: new Proxy({}, {
            get: (target, key) => key,
            getOwnPropertyDescriptor: () => ({ configurable: true }),
        }),
        ...intlProvider,
    };

    return (
        <IntlProvider { ...intlProvider }>
            <CookiesProvider { ...cookiesProvider }>
                <RouterScrollProvider { ...routerScrollProvider }>
                    <LayoutTree
                        Component={ children.type }
                        pageProps={ children.props } />
                </RouterScrollProvider>
            </CookiesProvider>
        </IntlProvider>
    );
};

AppTree.propTypes = {
    intlProvider: PropTypes.object,
    cookiesProvider: PropTypes.object,
    routerScrollProvider: PropTypes.object,
    children: PropTypes.element.isRequired,
};

export default AppTree;
