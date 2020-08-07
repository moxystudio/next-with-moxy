import enMessages from './messages/en-US.json';
import intlConfig from '.';

it('should export locales and policies', () => {
    expect(intlConfig).toMatchObject({
        locales: expect.any(Array),
        policies: expect.any(Array),
    });
});

it('should load messages from local JSON files', async () => {
    const enLocale = intlConfig.locales.find(({ id }) => id === 'en-US');

    const messages = await enLocale.loadMessages();

    expect(messages).toEqual(enMessages);
});
