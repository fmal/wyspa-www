/** @jsx jsx */
import React from 'react';
import { graphql, Link } from 'gatsby';
import { jsx, Container, Heading } from 'theme-ui';
import { animated } from 'react-spring';
import Img from 'gatsby-image';
import { useTranslation } from 'react-i18next';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Copy from '../components/Copy';
import ArrowLink, {
  DIRECTION as ARROW_DIRECTION
} from '../components/ArrowLink';
import Header from '../components/Header';
import EventMeta from '../components/EventMeta';
import MediaGallery from '../components/MediaGallery';
import {
  useFadeAnimation,
  useSlideInDownAndFadeAnimation,
  useSlideInLeftAndFadeAnimation
} from '../hooks/animations';

const Event = ({ data, location }) => {
  const { t } = useTranslation('event');
  const { directusEvent: event } = data;

  const titleProps = useSlideInDownAndFadeAnimation();
  const eventMetaProps = useSlideInLeftAndFadeAnimation({ delay: 650 });
  const fadeProps = useFadeAnimation({ delay: 500 });
  const bodyExtraNode = React.useRef(null);

  return (
    <React.Fragment>
      <SEO title={event.title} />
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
              {event.title}
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
          <div sx={{ gridColumn: [null, '1 / -1', null, 'span 2'] }}>
            <animated.div style={eventMetaProps}>
              <EventMeta event={event} />
            </animated.div>
          </div>
          <div
            sx={{
              gridColumn: [null, '1 / -1', null, '3 / span 5']
            }}
          >
            <animated.div style={fadeProps}>
              <Copy
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: event.body }}
              />
              {event.body_extra && event.media.length > 0 && (
                <ArrowLink
                  direction={ARROW_DIRECTION.BOTTOM}
                  as={Link}
                  to={`${location.pathname}#more`}
                  onClick={event => {
                    if (bodyExtraNode.current) {
                      event.preventDefault();

                      window.scrollTo({
                        top:
                          window.scrollY +
                          bodyExtraNode.current.getBoundingClientRect().top,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  sx={{
                    fontWeight: 'medium',
                    textDecoration: 'none',
                    color: 'textMuted',
                    fontSize: ['0.75rem', null, 0],
                    '&:focus, &:hover': {
                      color: 'primary'
                    }
                  }}
                >
                  {t('common:readMore')}
                </ArrowLink>
              )}
              {event.featured_image && event.show_featured_image && (
                <div sx={{ mt: 4, boxShadow: 'xl' }}>
                  <Img
                    fluid={event.featured_image.localFile.childImageSharp.fluid}
                  />
                </div>
              )}
            </animated.div>
          </div>
        </div>
        <MediaGallery media={event.media} />
        <div
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: theme => [
              '1fr',
              `repeat(auto-fill, minmax(${theme.sizes.col}, 1fr))`
            ],
            gridColumnGap: 4
          }}
        >
          <div
            sx={{
              gridColumn: [null, '1 / -1', null, '3 / span 5']
            }}
            id="more"
            ref={bodyExtraNode}
          >
            <animated.div style={fadeProps}>
              <Copy
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: event.body_extra }}
              />
            </animated.div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export const query = graphql`
  query EventById($id: String!, $language: String!) {
    directusEvent(id: { eq: $id }) {
      created_date
      start_date
      formattedStartDate: start_date(
        locale: $language
        formatString: "D MMMM YYYY"
      )
      formattedFullStartDate: start_date(
        locale: $language
        formatString: "D MMMM YYYY (dddd), HH:mm"
      )
      end_date
      formattedEndDate: end_date(locale: $language, formatString: "D MMMM YYYY")
      curators
      free_admission
      translations {
        language
        title
        body
        body_extra
        opening_hours
      }
      categories {
        translations {
          language
          name
        }
      }
      locations {
        translations {
          language
          name
          address
        }
        map_url
      }
      featured_image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 940, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      show_featured_image
      media {
        id
        embed
        title
        type
        width
        height
        localFile {
          childImageSharp {
            fluid(maxWidth: 1400, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
              presentationHeight
              presentationWidth
            }
          }
        }
      }
    }
  }
`;

export default localize(Event);
