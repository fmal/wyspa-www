/** @jsx jsx */
import React from 'react';
import { Container, Heading, Styled, jsx } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { animated, useSpring, config } from 'react-spring';
import { useTranslation } from 'react-i18next';
import Img from 'gatsby-image';

import SocialMediaLinks from './SocialMediaLinks';
import LanguageSelector from './LanguageSelector';
import HeaderBackground from './HeaderBackground';
import LocalizedLink from './LocalizedLink';

const HeaderCategory = ({ category, years, year, totalCount }) => {
  const { t } = useTranslation('common');

  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "logo" }) {
        childImageSharp {
          fixed(width: 76, height: 58, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  const logoProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(-30px, 0, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` }
  });
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });
  const infoProps = useSpring({
    config: config.slow,
    delay: 500,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <header sx={{ backgroundColor: 'indigo.1', position: 'relative' }}>
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <div
          sx={{
            position: 'relative',
            zIndex: 1,
            float: 'right',
            display: 'flex',
            alignItems: 'center',
            mt: [2, 3, 4]
          }}
        >
          <LanguageSelector sx={{ variant: 'text.body', mr: [2, 3] }} />
          <SocialMediaLinks sx={{ fontSize: [1, 2, 3] }} showIcons />
        </div>
        <div sx={{ mt: [5, 2, '1.25rem'], mb: 6, textAlign: 'center' }}>
          <animated.div style={logoProps}>
            <LocalizedLink
              to="/"
              rel="home"
              aria-label={t('backToHome')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text',
                textDecoration: 'none',
                '&:hover, &:focus': {
                  "[data-name='app-title']": {
                    textDecoration: 'underline'
                  }
                }
              }}
            >
              <div
                sx={{
                  width: '76px',
                  height: '58px',
                  display: 'inline-block',
                  mr: 3
                }}
              >
                <Img fixed={logo.file.childImageSharp.fixed} />
              </div>
              <span
                data-name="app-title"
                sx={{ variant: 'text.body', fontWeight: 'medium' }}
              >
                {t('title')}
              </span>
            </LocalizedLink>
          </animated.div>
          <div sx={{ mt: 5 }}>
            <animated.div style={titleProps}>
              <Heading
                as="h1"
                sx={{
                  fontSize: [3, 4, 5],
                  fontWeight: 'heading'
                }}
              >
                {category.name}
              </Heading>
            </animated.div>
            {years && (
              <animated.div style={infoProps}>
                <div sx={{ variant: 'text.body', mt: 3 }}>
                  {years
                    .sort((a, b) => Number(b.year) - Number(a.year))
                    .map(({ year }, i) => (
                      <React.Fragment key={year}>
                        {i > 0 && (
                          <span aria-hidden sx={{ color: 'textMuted', mx: 2 }}>
                            {'·'}
                          </span>
                        )}
                        <Styled.a
                          as={LocalizedLink}
                          to={`/${t('categorySlug')}/${category.slug}/${t(
                            'yearSlug'
                          )}/${year}`}
                        >
                          {year}
                        </Styled.a>
                      </React.Fragment>
                    ))}
                </div>
              </animated.div>
            )}
            {year && (
              <animated.div style={infoProps}>
                <div sx={{ variant: 'text.body', mt: 3, color: 'textMuted' }}>
                  {t('category:yearContext', {
                    count: totalCount,
                    year
                  })}
                  <span aria-hidden sx={{ color: 'textMuted', mx: 2 }}>
                    {'·'}
                  </span>
                  <Styled.a
                    as={LocalizedLink}
                    to={`/${t('categorySlug')}/${category.slug}`}
                  >
                    {t('category:allEvents')}
                  </Styled.a>
                </div>
              </animated.div>
            )}
          </div>
        </div>
      </Container>
      <HeaderBackground />
    </header>
  );
};

export default HeaderCategory;
