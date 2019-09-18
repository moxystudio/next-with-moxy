/* eslint-disable prefer-import/prefer-import-over-require */

const path = require('path');
const express = require('express');
const next = require('next');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    if (!dev) {
        // Server pre-compressed assets that were created at build time
        server.use('/_next/static/', expressStaticGzip(path.resolve('.next/static/'), {
            enableBrotli: true,
            orderPreference: ['br', 'gzip'],
            maxAge: 31536000000,
            immutable: true,
        }));

        // Activate compression for anything else, such as regular HTML pages
        server.use(compression());
    }

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, host, (err) => {
        if (err) { throw err; }
        console.log(`> Ready on http://localhost:${port}`);
    });
});
