/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import useConfig from '../hooks/useConfig';

const Layout = ({ children }) => {
  const { site } = useConfig();

  return (
    <>
      <Header siteTitle={site.siteMetadata.title} />
      <div className="container px-4 py-6 mx-auto">
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
