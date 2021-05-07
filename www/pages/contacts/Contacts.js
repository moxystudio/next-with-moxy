import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getIntlProps } from '@moxy/next-intl';
import Seo from '@moxy/next-seo';
import { Container } from '../../shared/react/grid';
import ProjectInfo from './project-info';
import { useSeoData } from './Contacts.data';

import styles from './Contacts.module.css';

const Contacts = () => {
    const seoData = useSeoData();

    return (
        <main className={ styles.contacts }>
            <Seo data={ seoData } />

            <Container>
                <h1>
                    <FormattedMessage id="contacts.title" />
                </h1>

                <ProjectInfo name="{project-name}" email="{project-email}" />
            </Container>
        </main>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: await getIntlProps(locale),
});

export default Contacts;
