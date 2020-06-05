import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Program = ({ data }) => {
  const {
    allDirectusEvent: { edges: events = [] }
  } = data;

  return (
    <Layout>
      <SEO title="Program" />
      <h1 className="m-0 text-xl">{'Program'}</h1>
      <ul className="mt-4">
        {events.map(({ node: event }) => (
          <li key={event.id}>
            <Link className="text-blue-700" to={`/program/${event.slug}`}>
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const pageQuery = graphql`
  query EventsQuery {
    allDirectusEvent {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;

export default Program;
