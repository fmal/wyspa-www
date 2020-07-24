/** @jsx jsx */
import React from 'react';
import { jsx, Heading, Container, Flex } from 'theme-ui';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { useTrail, animated } from 'react-spring';
import Img from 'gatsby-image';
import Obfuscate from 'react-obfuscate';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Copy from '../components/Copy';
import Section from '../components/Section';
import GoogleMap from '../components/GoogleMap';
import ArrowLink, {
  DIRECTION as ARROW_DIRECTION
} from '../components/ArrowLink';
import {
  useSlideInDownAndFadeAnimation,
  useFadeAnimation
} from '../hooks/animations';

const AboutUs = ({ data }) => {
  const { t } = useTranslation('aboutUs');
  const { directusAboutUs: page, allDirectusStaff: staff } = data;

  const titleProps = useSlideInDownAndFadeAnimation();
  const fadeProps = useFadeAnimation({ delay: 250 });
  const contactNode = React.useRef(null);
  const staffTrail = useTrail(staff.nodes.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    delay: 350
  });

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
                  sx={{
                    float: [null, null, 'right'],
                    ml: [null, null, 3],
                    mb: 3
                  }}
                />
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: page.body }} />
              </Copy>
              <p sx={{ variant: 'styles.p' }}>
                <ArrowLink
                  direction={ARROW_DIRECTION.BOTTOM}
                  href={`${location.pathname}#contact`}
                  onClick={event => {
                    if (contactNode.current) {
                      event.preventDefault();

                      window.scrollTo({
                        top:
                          window.scrollY +
                          contactNode.current.getBoundingClientRect().top,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  sx={{
                    fontWeight: 'medium',
                    textDecoration: 'none',
                    fontSize: ['0.75rem', null, 0]
                  }}
                >
                  {t('contact')}
                </ArrowLink>
              </p>
            </animated.div>
          </div>
        </div>
        <Section>
          <Section.Heading as={animated.h2} style={fadeProps}>
            {t('staff')}
          </Section.Heading>
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', null, `repeat(2, 1fr)`],
              gridColumnGap: 4,
              gridRowGap: [null, 2]
            }}
          >
            {staffTrail.map((style, idx) => {
              const personData = staff.nodes[idx];

              return (
                <animated.div key={personData.id} style={style}>
                  <Flex
                    sx={{ alignItems: 'center', mb: theme => theme.sizes[6] }}
                  >
                    {personData.avatar && (
                      <div
                        sx={{
                          flexShrink: 0,
                          mr: theme => [3, null, null, theme.sizes[6]]
                        }}
                      >
                        <Img
                          sx={{
                            verticalAlign: 'top',
                            borderRadius: 'full'
                          }}
                          fixed={
                            personData.avatar.localFile.childImageSharp.fixed
                          }
                          alt={`${personData.first_name} ${personData.last_name}`}
                        />
                      </div>
                    )}
                    <div sx={{ flexGrow: 1 }}>
                      <Heading as="h3">
                        {personData.first_name} {personData.last_name}
                      </Heading>
                      <p
                        sx={{
                          variant: 'text.default',
                          mt: 1,
                          mb: 0,
                          fontWeight: 500,
                          color: 'textMuted'
                        }}
                      >
                        {personData.role}
                      </p>
                    </div>
                  </Flex>
                  {personData.bio && (
                    <Copy
                      dangerouslySetInnerHTML={{ __html: personData.bio }}
                    />
                  )}
                  {personData.email && (
                    <p sx={{ variant: 'styles.p' }}>
                      <Obfuscate
                        sx={{ variant: 'styles.a' }}
                        email={personData.email}
                      />
                    </p>
                  )}
                </animated.div>
              );
            })}
          </div>
        </Section>
        <Section id="contact" ref={contactNode}>
          <Section.Heading as={animated.h2} style={fadeProps}>
            {t('contact')}
          </Section.Heading>
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', null, `repeat(2, 1fr)`],
              gridColumnGap: 4
            }}
          >
            <div sx={{ gridRow: ['2', null, '1 / 1'] }}>
              <GoogleMap
                lat={page.location.lat}
                lng={page.location.lng}
                defaultZoom={15}
              />
            </div>
            <div sx={{ gridRow: ['1', null, '1 / 1'] }}>
              <animated.div style={fadeProps}>
                <Copy dangerouslySetInnerHTML={{ __html: page.contact }} />
                <p sx={{ variant: 'styles.p' }}>
                  <Obfuscate sx={{ variant: 'styles.a' }} email={page.email} />
                </p>
              </animated.div>
            </div>
          </div>
        </Section>
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
        contact
      }
      email
      location {
        lat
        lng
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
    allDirectusStaff(
      sort: { fields: [order, created_date], order: [ASC, DESC] }
    ) {
      nodes {
        email
        first_name
        last_name
        avatar {
          localFile {
            childImageSharp {
              fixed(width: 90, height: 90, cropFocus: ATTENTION) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        translations {
          language
          role
          bio
        }
        id
      }
    }
  }
`;

export default localize(AboutUs);
