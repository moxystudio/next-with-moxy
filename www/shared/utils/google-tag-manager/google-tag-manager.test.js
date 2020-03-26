beforeEach(() => {
    process.env.GTM_TRACKING_ID = 'foo';
    process.env.GTM_DATA_LAYER = 'bar';
});

afterEach(() => {
    const { destroyGTM } = require('./google-tag-manager');

    destroyGTM();

    delete window[process.env.GTM_DATA_LAYER];

    jest.resetModules();
    jest.clearAllMocks();
});

describe('initGTM', () => {
    it('should initialize GTM script', () => {
        const { initGTM } = require('./google-tag-manager');

        initGTM();

        const script = document.getElementById(`gtm-${process.env.GTM_TRACKING_ID}`);

        expect(script).toBeInstanceOf(HTMLElement);
        expect(script.innerHTML).toContain(`'${process.env.GTM_DATA_LAYER}'`);
        expect(script.innerHTML).toContain(`'${process.env.GTM_TRACKING_ID}'`);
    });

    it('should skip initializing if already initialized', () => {
        const { initGTM } = require('./google-tag-manager');

        const script = document.createElement('script');

        script.id = `gtm-${process.env.GTM_TRACKING_ID}`;

        document.head.appendChild(script);

        initGTM();

        expect(document.querySelectorAll(`[id="gtm-${process.env.GTM_TRACKING_ID}"]`)).toHaveLength(1);
    });

    it('should not initialize GTM script if env variables are missing', () => {
        delete process.env.GTM_TRACKING_ID;

        const { initGTM } = require('./google-tag-manager');

        initGTM();

        expect(document.getElementById(`gtm-${process.env.GTM_TRACKING_ID}`)).toBe(null);
    });
});

describe('destroyGTM', () => {
    it('should remove GTM script', () => {
        const { initGTM, destroyGTM } = require('./google-tag-manager');

        initGTM();
        destroyGTM();

        expect(document.getElementById(`gtm-${process.env.GTM_TRACKING_ID}`)).toBe(null);
    });

    it('should reset dataLayer', () => {
        const { destroyGTM } = require('./google-tag-manager');

        window[process.env.GTM_DATA_LAYER] = [{ foo: 'bar' }];

        destroyGTM();

        expect(window[process.env.GTM_DATA_LAYER]).toBe(undefined);
    });

    it('should do nothing if env variables are missing', () => {
        delete process.env.GTM_TRACKING_ID;

        const { destroyGTM } = require('./google-tag-manager');

        const script = document.createElement('script');

        script.id = `gtm-${process.env.GTM_TRACKING_ID}`;

        document.head.appendChild(script);

        destroyGTM();

        expect(document.getElementById(`gtm-${process.env.GTM_TRACKING_ID}`)).toBe(script);
    });
});

describe('dataLayer', () => {
    it('should push to global dataLayer', () => {
        const { dataLayer } = require('./google-tag-manager');

        dataLayer({ foo: 'bar' });

        expect(window[process.env.GTM_DATA_LAYER]).toEqual([{ foo: 'bar' }]);
    });

    it('should do nothing if env variables are missing', () => {
        delete process.env.GTM_TRACKING_ID;

        const { dataLayer } = require('./google-tag-manager');

        dataLayer({ foo: 'bar' });

        expect(window[process.env.GTM_DATA_LAYER]).toBe(undefined);
    });
});
