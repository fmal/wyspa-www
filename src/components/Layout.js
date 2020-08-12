/** @jsx jsx */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';
import { jsx } from 'theme-ui';

import Footer from './Footer';
import BackToTop from './BackToTop';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Global
        styles={theme => ({
          '*': {
            boxSizing: 'inherit'
          },
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%'
          },
          '#gatsby-focus-wrapper': {
            display: 'flex',
            flexDirection: 'column'
          },
          html: {
            fontSize: '18px'
          },
          img: {
            borderStyle: 'none'
          },
          pre: {
            fontFamily: 'monospace',
            fontSize: '1em'
          },
          '[hidden]': {
            display: 'none'
          },
          '::selection': {
            background: theme.colors.text,
            color: theme.colors.background
          }
        })}
      />
      <div
        sx={{
          flex: '1 0 auto'
        }}
      >
        {children}
      </div>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
