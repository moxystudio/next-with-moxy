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
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
