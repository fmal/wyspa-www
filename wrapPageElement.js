import React from 'react';
import { Helmet } from 'react-helmet';

import I18nProvider from './src/providers/I18n';
import AlternateLinksProvider from './src/providers/AlternateLinks';
import CurrentPathProvider from './src/providers/CurrentPath';
import Layout from './src/components/Layout';
import interRomanWoff2 from './src/fonts/inter/inter-roman-subset.woff2';
import interItalicWoff2 from './src/fonts/inter/inter-italic-subset.woff2';
import interFontFaces from './src/fonts/inter';

const wrapPageElement = ({ element, props }) => (
  <I18nProvider {...props}>
    <AlternateLinksProvider {...props}>
      <CurrentPathProvider path={props.location.pathname}>
        <React.Fragment>
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
              <link
                href={interRomanWoff2}
                as="font"
                type="font/woff2"
                rel="preload"
                crossOrigin
              />
              <link
                href={interItalicWoff2}
                as="font"
                type="font/woff2"
                rel="preload"
                crossOrigin
              />
              <style>{interFontFaces}</style>
            </Helmet>
          }
          <Layout {...props}>{element}</Layout>
        </React.Fragment>
      </CurrentPathProvider>
    </AlternateLinksProvider>
  </I18nProvider>
);

export default wrapPageElement;
