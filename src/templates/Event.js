/** @jsx jsx */

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { jsx, Styled } from 'theme-ui';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Copy from '../components/Copy';

const Event = ({ data }) => {
  const { directusEvent: event } = data;

  return (
    <React.Fragment>
      <SEO title={event.title} />
      <Styled.h1>{event.title}</Styled.h1>
      <Styled.p>{event.created_date}</Styled.p>
      {event.featured_image && (
        <div sx={{ mt: 4, maxWidth: '5xl' }}>
          <Img fluid={event.featured_image.localFile.childImageSharp.fluid} />
        </div>
      )}
      <Copy
        sx={{ mt: 4 }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: event.body }}
      />
    </React.Fragment>
  );
};

export const query = graphql`
  query EventById($id: String!) {
    directusEvent(id: { eq: $id }) {
      created_date
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
