import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAlternateLinks } from '../providers/AlternateLinks';
import LocalizedLink from '../components/LocalizedLink';

const Header = ({ siteTitle }) => {
  const alternateLinks = useAlternateLinks();
  const { t, i18n } = useTranslation('common');

  return (
    <header className="bg-teal-200">
      <div className="container px-4 py-6 mx-auto">
        <div className="float-right">
          {alternateLinks &&
            alternateLinks
              .filter(link => link.language !== i18n.language)
              .map((link, i) => [
                i > 0 && ' | ',
                <Link
                  to={link.path}
                  className="text-gray-900"
                  hrefLang={link.language}
                >
                  {t(link.language)}
                </Link>
              ])}
        </div>
        <h1 className="m-0 text-xl">
          <LocalizedLink to="/" className="text-gray-900">
            {siteTitle}
          </LocalizedLink>
        </h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;
