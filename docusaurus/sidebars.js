module.exports = {
    docs: {
        Welcome: ['motivation'],
        'Getting Started': [
            'getting-started/instructions',
            {
                type: 'category',
                label: 'What\'s included',
                items: [
                    'getting-started/what-s-included/file-loaders',
                    'getting-started/what-s-included/environment-variables',
                    'getting-started/what-s-included/node-modules-compiling',
                    'getting-started/what-s-included/css-modules',
                    'getting-started/what-s-included/docker',
                    'getting-started/what-s-included/eslint-stylelint',
                    'getting-started/what-s-included/jest-rtl',
                    'getting-started/what-s-included/browser-support',
                    'getting-started/what-s-included/one-of-webpack',
                    'getting-started/what-s-included/everything-else',
                ],
            },
            'getting-started/conventions',
            'getting-started/available-scripts',
        ],
        Recipes: ['recipes/recipes'],
        About: ['this-document'],
    },
};
