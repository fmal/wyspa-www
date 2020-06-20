import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';

const Event = ({ data }) => {
  const { directusEvent: event } = data;

  return (
    <>
      <SEO title={event.title} />
      <h1 className="text-xl">{event.title}</h1>
      <p className="text-gray-700">{event.created_date}</p>
      {event.featured_image && (
        <div className="max-w-3xl mt-4">
          <Img fluid={event.featured_image.localFile.childImageSharp.fluid} />
        </div>
      )}
      <div
        className="mt-4"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: event.body }}
      />
    </>
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
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`;

export default Event;
