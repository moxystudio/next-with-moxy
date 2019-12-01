module.exports = {
    title: 'Next.js with MOXY',
    tagline: 'MOXY\'s boilerplate to create Next.js based applications',
    url: 'https://next-with.moxy.tech',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'moxystudio',
    projectName: 'next-with-moxy',
    themeConfig: {
        navbar: {
            title: 'Next.js with MOXY',
            logo: {
                alt: 'Next.js with MOXY',
                src: 'img/logo-nwm.png',
            },
            links: [
                { to: 'docs/welcome/what-is-this', label: 'Docs', position: 'right' },
                {
                    href: 'https://github.com/moxystudio/next-with-moxy',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            logo: {
                alt: 'MOXY studio logo',
                src: 'img/logo-moxy.svg',
            },
            copyright: `Copyright © ${new Date().getFullYear()} MOXY studio`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
