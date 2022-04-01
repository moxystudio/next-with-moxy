import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { localesMap } from '../../intl';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps, locale: ctx.locale };
    }

    render() {
        const dir = localesMap[this.props.locale].dir;

        return (
            <Html dir={ dir }>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&amp;display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
