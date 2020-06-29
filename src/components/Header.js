/** @jsx jsx */
import { Container, Heading, jsx } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { animated, useSpring, config } from 'react-spring';
import { useTranslation } from 'react-i18next';
import Img from 'gatsby-image';

import HeaderBackground from './HeaderBackground';
import SocialMediaLinks from './SocialMediaLinks';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation('common');

  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "logo" }) {
        childImageSharp {
          fixed(width: 166, height: 126, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  const fadeProps = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const fadeDownProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
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
            mt: [2, 3, null, 4]
          }}
        >
          <LanguageSelector sx={{ variant: 'text.body', mr: [2, 3] }} />
          <SocialMediaLinks sx={{ fontSize: [1, 2, 3] }} showIcons />
        </div>
        <div sx={{ mt: 5, mb: 6, textAlign: 'center' }}>
          <animated.div style={fadeProps}>
            <div
              sx={{
                height: ['94px', '126px'],
                width: ['124px', '166px'],
                mx: 'auto',
                '> div': {
                  height: ['94px !important', '126px !important'],
                  width: ['124px !important', '166px !important']
                }
              }}
            >
              <Img fixed={logo.file.childImageSharp.fixed} />
            </div>
          </animated.div>
          <animated.div style={fadeDownProps}>
            <Heading
              as="h1"
              sx={{
                mt: 4,
                fontSize: [3, 4, 5],
                fontWeight: 'heading'
              }}
            >
              {t('title')}
            </Heading>
          </animated.div>
        </div>
      </Container>
      <HeaderBackground />
    </header>
  );
};

export default Header;
