import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const Home = () => {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    return (
        <Layout
            title={ `${siteConfig.title} — Docs` }
            description="MOXY\'s boilerplate to create Next.js based applications">
            <main className={ classnames('hero hero--primary', styles.heroBanner) }>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={ styles.buttons }>
                        <Link
                            className={ classnames(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            ) }
                            to={ useBaseUrl('docs/motivation') }>
                            Get Started
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Home;
