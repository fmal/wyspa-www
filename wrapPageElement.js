import React from 'react';
import { Helmet } from 'react-helmet';

import I18nProvider from './src/providers/I18n';
import AlternateLinksProvider from './src/providers/AlternateLinks';
import CurrentPathProvider from './src/providers/CurrentPath';
import Layout from './src/components/Layout';

const wrapPageElement = ({ element, props }) => (
  <I18nProvider {...props}>
    <AlternateLinksProvider {...props}>
      <CurrentPathProvider path={props.location.pathname}>
        <>
          {
            <Helmet htmlAttributes={{ lang: props.pageContext.language }}>
              {props.pageContext &&
                props.pageContext.alternateLinks &&
                props.pageContext.alternateLinks.map(link => (
                  <link
                    key={link.language}
                    rel="alternate"
                    hrefLang={link.language}
                    href={link.path}
                  />
                ))}
            </Helmet>
          }
          <Layout {...props}>{element}</Layout>
        </>
      </CurrentPathProvider>
    </AlternateLinksProvider>
  </I18nProvider>
);

export default wrapPageElement;
