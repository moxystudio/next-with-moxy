const locales = [
    { tag: 'en-US', label: 'English', dir: 'ltr' },
];

const defaultLocale = 'en-US';

const localesMap = locales.reduce((localesMap, locale) => {
    localesMap[locale.tag] = locale;

    return localesMap;
}, {});

// eslint-disable-next-line import/no-commonjs
module.exports = {
    locales,
    localesMap,
    defaultLocale,
};
