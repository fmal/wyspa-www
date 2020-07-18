/** @jsx jsx */
import React from 'react';
import { graphql } from 'gatsby';
import { jsx, Container, Heading } from 'theme-ui';
import { animated } from 'react-spring';
import Img from 'gatsby-image';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Copy from '../components/Copy';
import Header from '../components/Header';
import EventMeta from '../components/EventMeta';
import {
  useFadeAnimation,
  useSlideInDownAndFadeAnimation
} from '../hooks/animations';

const Event = ({ data }) => {
  const { directusEvent: event } = data;

  const titleProps = useSlideInDownAndFadeAnimation();
  const fadeProps = useFadeAnimation({ delay: 500 });

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
            gridTemplateColumns: [
              '1fr',
              'repeat(auto-fill, minmax(128px, 1fr))'
            ],
            gridColumnGap: 4
          }}
        >
          <div sx={{ gridColumn: [null, '1 / -1', null, 'span 2'] }}>
            <animated.div style={fadeProps}>
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
              {event.featured_image && (
                <div sx={{ mt: 4 }}>
                  <Img
                    fluid={event.featured_image.localFile.childImageSharp.fluid}
                  />
                </div>
              )}
            </animated.div>
          </div>
        </div>
        <div
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: [
              '1fr',
              'repeat(auto-fill, minmax(128px, 1fr))'
            ],
            gridColumnGap: 4
          }}
        >
          <div
            sx={{
              gridColumn: [null, '1 / -1', null, '3 / span 5']
            }}
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
      start_date(locale: $language, formatString: "D MMMM YYYY")
      start_date_full: start_date(
        locale: $language
        formatString: "D MMMM YYYY (dddd), HH:mm"
      )
      end_date(locale: $language, formatString: "D MMMM YYYY")
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
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default localize(Event);
