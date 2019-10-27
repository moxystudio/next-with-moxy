/* eslint-disable prefer-import/prefer-import-over-require */

const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    router.all('*', async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });

    server.use(router.routes());

    server.listen(port, host, (err) => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on http://localhost:${port}`);
    });
})
.catch((err) => {
    setImmediate(() => {
        throw err;
    });
});
