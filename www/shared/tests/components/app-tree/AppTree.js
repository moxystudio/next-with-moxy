import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import idObj from 'identity-obj-proxy';

// AppTreeWrapper setups providers defined ONLY by HOCs that wrap your www/app/App.js
// It's used by www/app/App.test.js to perform unit tests

export const AppTreeWrapper = ({ intlProvider, children }) => {
    const intlProviderProps = {
        locale: 'en-US',
        messages: idObj,
        ...intlProvider,
    };

    return (
        <IntlProvider { ...intlProviderProps }>{ children }</IntlProvider>
    );
};

AppTreeWrapper.propTypes = {
    intlProvider: PropTypes.object,
    children: PropTypes.node,
};

// AppTree setups providers defined by HOCs that wrap your www/app/App.js,
// as well as the ones defined in its render method
// It's used by all tests of App descendants that need any of these providers to perform unit tests

const AppTree = ({ children, ...props }) => (
    <AppTreeWrapper { ...props }>
        { children }
    </AppTreeWrapper>
);

AppTree.propTypes = {
    innerProviders: PropTypes.bool,
    intlProvider: PropTypes.object,
    children: PropTypes.node,
};

export default AppTree;
