import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="bg-teal-200">
    <div className="container mx-auto px-4 py-6">
      <h1 className="m-0 text-xl">
        <Link to="/" className="text-gray-900">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;
