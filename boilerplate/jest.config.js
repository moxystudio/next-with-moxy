module.exports = {
    setupFiles: ['./jest.setup.js'],
    // Transform files for Jest
    transform: {
        '\\.js$': require.resolve('babel-jest'),
        // Raster images (png, jpg, etc)
        '\\.(png|jpg|jpeg|gif|webp|ico)$': require.resolve('jest-file'),
        // Web fonts
        '\\.(eot|ttf|woff|woff2|otf)$': require.resolve('jest-file'),
        // Audio & Video
        '\\.(mp3|flac|wav|aac|ogg|oga|mp4|m4a|webm|ogv)$': require.resolve('jest-file'),
        // SVGs
        '\\.(svg)$': require.resolve('jest-file'),
    },
    moduleNameMapper: {
        '\\.css$': require.resolve('identity-obj-proxy'),
    },
    // Snapshots
    setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
    // Coverage
    collectCoverageFrom: [
        'src/**/*.js',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
};
