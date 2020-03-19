'use strict';

module.exports = {
    docs: [
        {
            type: 'category',
            label: 'Welcome',
            items: [
                'welcome/what-is-this',
                'welcome/instructions',
                'welcome/conventions',
            ],
        },
        {
            type: 'category',
            label: 'What\'s included',
            items: [
                'what-is-included/available-scripts',
                'what-is-included/eslint-stylelint',
                'what-is-included/css-modules',
                'what-is-included/customizable-layout-support',
                'what-is-included/internationalization',
                'what-is-included/testing-with-jest-rtl',
                'what-is-included/browser-support',
                'what-is-included/environment-variables',
                'what-is-included/docker',
                'what-is-included/webpack-file-loaders',
                'what-is-included/webpack-one-of-rules',
                'what-is-included/node-modules-compiling',
                'what-is-included/everything-else',
            ],
        },
        {
            type: 'category',
            label: 'Recipes',
            items: [
                'recipes/rest-api',
                'recipes/splash-screen',
                'recipes/favicon-os-theme',
                {
                    type: 'link',
                    label: 'Private recipes',
                    href: 'https://next-with-moxy-recipes.moxy.tech',
                },
            ],
        },
        {
            type: 'doc',
            id: 'this-document',
        },
    ],
};
