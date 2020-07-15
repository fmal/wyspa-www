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
import EventInfo from '../components/EventInfo';
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
            mt: [4, null, '3.5rem', null, '4rem'],
            textAlign: ['left', null, null, 'center']
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
      <Container sx={{ maxWidth: '3xl', mt: [2, 3] }}>
        <animated.div style={fadeProps}>
          <EventInfo event={event} />
        </animated.div>
        <animated.div style={fadeProps}>
          <Copy
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: event.body }}
          />
        </animated.div>
        {event.featured_image && (
          <animated.div sx={{ mt: 4, maxWidth: '3xl' }} style={fadeProps}>
            <Img fluid={event.featured_image.localFile.childImageSharp.fluid} />
          </animated.div>
        )}
      </Container>
    </React.Fragment>
  );
};

export const query = graphql`
  query EventById($id: String!) {
    directusEvent(id: { eq: $id }) {
      created_date
      start_date
      end_date
      translations {
        language
        title
        body
      }
      categories {
        translations {
          language
          name
        }
      }
      featured_image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default localize(Event);
