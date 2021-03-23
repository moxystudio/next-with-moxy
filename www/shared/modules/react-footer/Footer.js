import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Footer.module.css';

const Footer = ({ className, ...rest }) => {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className={ classNames(styles.footer, className) } { ...rest }>
            { year } © MOXY
        </footer>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
