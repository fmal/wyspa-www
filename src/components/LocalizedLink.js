import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

const LocalizedLink = ({ to, ...props }) => {
  const { i18n } = useTranslation();

  const isIndex = to === '/';
  const path = `/${i18n.language}${isIndex ? '' : to}`;

  return <Link {...props} to={path} />;
};

LocalizedLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default LocalizedLink;
