import React from 'react';
import { graphql } from 'gatsby';

import localize from '../components/localize';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

const CategoryArchive = ({ data, pageContext }) => {
  const { events, category } = data;
  const { currentPage, pageCount, year } = pageContext;
  const { t } = useTranslation('category');

  return (
    <>
      <SEO title={`${category.name} -  ${year}`} />
      <h1 className="m-0 text-xl">{`${category.name} -  ${year}`}</h1>
      <ul className="mt-4">
        {events.nodes.map(event => (
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
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        contextPage={`${t('common:categorySlug')}/${category.slug}/${t(
          'common:yearSlug'
        )}/${year}`}
      />
    </>
  );
};

export const query = graphql`
  query CategoryArchivePageQuery(
    $id: String!
    $year: Int!
    $language: String!
    $skip: Int!
    $limit: Int!
  ) {
    category: directusCategory(id: { eq: $id }) {
      translations {
        name
        slug
        language
      }
    }
    events: allDirectusEvent(
      sort: { fields: created_date, order: DESC }
      filter: {
        fields: { year: { eq: $year } }
        translations: { elemMatch: { language: { eq: $language } } }
        categories: { elemMatch: { id: { eq: $id } } }
      }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        id
        translations {
          slug
          title
          language
        }
      }
    }
  }
`;

export default localize(CategoryArchive);
