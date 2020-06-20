import React from 'react';
import { graphql } from 'gatsby';

import localize from '../components/localize';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { useTranslation } from 'react-i18next';

const Category = ({ data }) => {
  const { events, category } = data;
  const { t } = useTranslation('common');

  return (
    <>
      <SEO title={category.name} />
      <h1 className="m-0 text-xl">{category.name}</h1>
      <ul className="mt-4">
        {events.edges.map(({ node: event }) => (
          <li key={event.id}>
            <LocalizedLink
              className="text-blue-700"
              to={`/${t('common:eventSlug')}/${event.slug}`}
            >
              {event.title}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export const query = graphql`
  query CategoryPageQuery($id: String!, $language: String!) {
    category: directusCategory(id: { eq: $id }) {
      translations {
        name
        language
      }
    }
    events: allDirectusEvent(
      filter: {
        translations: { elemMatch: { language: { eq: $language } } }
        categories: { elemMatch: { id: { eq: $id } } }
      }
    ) {
      edges {
        node {
          id
          translations {
            slug
            title
            language
          }
        }
      }
    }
  }
`;

export default localize(Category);
