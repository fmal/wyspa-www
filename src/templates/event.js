import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Event = ({ data }) => {
  const { directusEvent: event } = data;

  return (
    <Layout>
      <SEO title={event.title} />
      <h1 className="text-xl">{event.title}</h1>
      <p className="text-gray-700">{event.created}</p>
      <div className="mt-4 max-w-3xl">
        <Img fluid={event.image.localFile.childImageSharp.fluid} />
      </div>
      <div
        className="mt-4"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: event.description }}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query EventById($directusId: Int!) {
    directusEvent(directusId: { eq: $directusId }) {
      title
      description
      created
      image {
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
