/** @jsx jsx */
import React from 'react';
import { graphql } from 'gatsby';
import { jsx, Container } from 'theme-ui';
import { animated, useSpring, config } from 'react-spring';
import Img from 'gatsby-image';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Copy from '../components/Copy';
import HeaderEvent from '../components/HeaderEvent';
import EventInfo from '../components/EventInfo';

const Event = ({ data }) => {
  const { directusEvent: event } = data;

  const contentProps = useSpring({
    config: config.slow,
    delay: 500,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const fadeProps = useSpring({
    config: config.slow,
    delay: 500,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <React.Fragment>
      <SEO title={event.title} />
      <HeaderEvent event={event} />
      <Container sx={{ maxWidth: '3xl', mt: [2, 3] }}>
        <animated.div style={fadeProps}>
          <EventInfo event={event} />
        </animated.div>
        <animated.div style={contentProps}>
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
