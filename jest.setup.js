// Mock Next.js router so that useRouter hook works.
jest.mock('next/router', () => {
    const router = {
        pathname: '/',
        query: {},
        asPath: '/',
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        push: jest.fn(async () => {}),
        replace: jest.fn(async () => {}),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(async () => {}),
        beforePopState: jest.fn(),
        isFallback: false,
    };

    return {
        __esModule: true,
        default: router,
        useRouter: () => router,
    };
});

// Mock Next.js internal router so that <Link> uses our mock as well.
jest.mock('next/dist/client/router', () => require('next/router'));
