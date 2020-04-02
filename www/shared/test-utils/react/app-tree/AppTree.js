import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { CookiesProvider } from 'react-cookie';
import idObj from 'identity-obj-proxy';
import { LayoutTree } from '@moxy/next-layout';

// AppTreeWrapper setups providers defined ONLY by HOCs that wrap your www/app/App.js
// It's used by www/app/App.test.js to perform unit tests

export const AppTreeWrapper = ({ intlProvider, cookiesProvider, children }) => {
    intlProvider = {
        locale: 'en-US',
        messages: idObj,
        ...intlProvider,
    };

    return (
        <IntlProvider { ...intlProvider }>
            <CookiesProvider { ...cookiesProvider }>
                { children }
            </CookiesProvider>
        </IntlProvider>
    );
};

AppTreeWrapper.propTypes = {
    intlProvider: PropTypes.object,
    cookiesProvider: PropTypes.object,
    children: PropTypes.element.isRequired,
};

// AppTree setups providers defined by HOCs that wrap your www/app/App.js,
// as well as the ones defined in its render method
// It's used by all tests of App descendants that need any of these providers to perform unit tests

const AppTree = ({ children, ...props }) => (
    <AppTreeWrapper { ...props }>
        <LayoutTree
            Component={ children.type }
            pageProps={ children.props } />
    </AppTreeWrapper>
);

AppTree.propTypes = {
    intlProvider: PropTypes.object,
    cookiesProvider: PropTypes.object,
    children: PropTypes.element.isRequired,
};

export default AppTree;
