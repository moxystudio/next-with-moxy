import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ProjectInfo = ({ name, email }) => (
    <>
        <p><FormattedMessage id="contacts.name" values={ { name } } /></p>
        <p><FormattedMessage id="contacts.email" values={ { email } } /></p>
    </>
);

ProjectInfo.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default ProjectInfo;
