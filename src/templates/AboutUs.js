/** @jsx jsx */
import React from 'react';
import { jsx, Heading, Container } from 'theme-ui';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { animated } from 'react-spring';
import Img from 'gatsby-image';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Copy from '../components/Copy';
import {
  useSlideInDownAndFadeAnimation,
  useFadeAnimation
} from '../hooks/animations';

const AboutUs = ({ data }) => {
  const { t } = useTranslation('aboutUs');
  const { directusAboutUs: page } = data;

  const titleProps = useSlideInDownAndFadeAnimation();
  const fadeProps = useFadeAnimation({ delay: 500 });

  return (
    <React.Fragment>
      <SEO title={t('title')} />
      <Header>
        <div
          sx={{
            mt: [4, null, '3.5rem', null, '4rem']
          }}
        >
          <animated.div style={titleProps}>
            <Heading
              as="h1"
              sx={{
                fontSize: [3, 4, 5],
                fontWeight: 'heading'
              }}
            >
              {t('title')}
            </Heading>
          </animated.div>
        </div>
      </Header>
      <Container sx={{ mt: [null, null, 2, 3] }}>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: theme => [
              '1fr',
              `repeat(auto-fill, minmax(${theme.sizes.col}, 1fr))`
            ],
            gridColumnGap: 4
          }}
        >
          <div sx={{ gridColumn: [null, '1 / -1', '1 / -2', '1 / -1'] }}>
            <animated.div style={fadeProps}>
              <Copy
                sx={{
                  columnCount: [null, null, null, 2],
                  columnGap: [null, null, null, 4]
                }}
              >
                <Img
                  fixed={page.image.localFile.childImageSharp.fixed}
                  alt=""
                  sx={{ float: [null, null, 'right'], ml: 3, mb: 3 }}
                />
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: page.body }} />
              </Copy>
            </animated.div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export const query = graphql`
  query AboutUsQuery {
    directusAboutUs {
      translations {
        language
        body
      }
      image {
        localFile {
          childImageSharp {
            fixed(width: 324) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`;

export default localize(AboutUs);
