import TagManager from 'react-gtm-module';

const tagManagerInitialArgs = {
    gtmId: process.env.GTM_TRACKING_ID,
};

const initializeTagManager = (args) => {
    if (!process.env.GTM_TRACKING_ID) {
        return;
    }

    TagManager.initialize({ ...tagManagerInitialArgs, ...args });
};

export default initializeTagManager;
