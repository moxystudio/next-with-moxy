import React from 'react';
import { NextIntlScript } from '@moxy/next-intl';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        const { assetPrefix } = this.props.__NEXT_DATA__;

        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextIntlScript assetPrefix={ assetPrefix } />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
