import React from 'react';
import { Helmet } from 'react-helmet';

import I18nProvider from './src/providers/I18n';
import AlternateLinksProvider from './src/providers/AlternateLinks';
import CurrentPathProvider from './src/providers/CurrentPath';
import Layout from './src/components/Layout';
import amstelvarRomanWoff2 from './src/fonts/amstelvar/amstelvar-roman-subset.woff2';
import amstelvarItalicWoff2 from './src/fonts/amstelvar/amstelvar-italic-subset.woff2';
import interWoff2 from './src/fonts/inter/inter-subset.woff2';
import amstelvarFontFaces from './src/fonts/amstelvar';
import interFontFace from './src/fonts/inter';

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
                href={amstelvarRomanWoff2}
                as="font"
                type="font/woff2"
                rel="preload"
                crossOrigin
              />
              <link
                href={amstelvarItalicWoff2}
                as="font"
                type="font/woff2"
                rel="preload"
                crossOrigin
              />
              <link
                href={interWoff2}
                as="font"
                type="font/woff2"
                rel="preload"
                crossOrigin
              />
              <style>
                {`
                  ${amstelvarFontFaces}
                  ${interFontFace}
                `}
              </style>
              <script />
            </Helmet>
          }
          <Layout {...props}>{element}</Layout>
        </React.Fragment>
      </CurrentPathProvider>
    </AlternateLinksProvider>
  </I18nProvider>
);

export default wrapPageElement;
