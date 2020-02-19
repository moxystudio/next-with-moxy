let initializeTagManager;
const initializeMock = jest.fn();

jest.doMock('react-gtm-module', () => ({ initialize: initializeMock }));

beforeEach(() => {
    process.env.GTM_TRACKING_ID = 'foo';
    initializeTagManager = require('./initialize-tag-manager').default;
});

afterEach(() => {
    jest.clearAllMocks();
});

it('should initialize gtm module if tracking id is provided', () => {
    initializeTagManager();

    expect(initializeMock).toHaveBeenCalled();
});

it('should not initialize gtm module if tracking id is not provided', () => {
    delete process.env.GTM_TRACKING_ID;

    initializeTagManager();

    expect(initializeMock).not.toHaveBeenCalled();
});
