import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getIntlProps } from '@moxy/next-intl';
import { Container } from '../../shared/react/grid';

import styles from './Home.module.css';

const Home = () => (
    <main className={ styles.home }>
        <Container>
            <h1>
                <FormattedMessage id="home.title" />
            </h1>

            <div className={ styles.typographyShowcase }>
                <h1>typography-h1</h1>
                <h2>typography-h2</h2>
                <h3>typography-h3</h3>
                <h4>typography-h4</h4>
                <h5>typography-h5</h5>
                <h6>typography-h6</h6>

                <div className={ styles.subtitle1 }>typography-subtitle-1</div>
                <div className={ styles.subtitle2 }>typography-subtitle-2</div>
                <div className={ styles.body1 }>typography-body-1</div>
                <div className={ styles.body2 }>typography-body-2</div>
                <div className={ styles.textButton }>typography-text-button</div>
                <div className={ styles.caption }>typography-caption</div>
                <div className={ styles.overline }>typography-overline</div>
            </div>
        </Container>
    </main>
);

export const getStaticProps = async ({ locale }) => ({
    props: await getIntlProps(locale),
});

export default Home;
