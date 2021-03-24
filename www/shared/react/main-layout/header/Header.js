import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import { Container } from '../../grid';
import styles from './Header.module.css';

const Header = ({ className, ...rest }) => (
    <header className={ classNames(styles.header, className) } { ...rest }>
        <Container>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/contacts">
                        <a>Contacts</a>
                    </Link>
                </li>
            </ul>
        </Container>
    </header>
);

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
