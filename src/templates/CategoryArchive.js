import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Styled } from 'theme-ui';

import localize from '../components/localize';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import Pagination from '../components/Pagination';

const CategoryArchive = ({ data, pageContext }) => {
  const { events, category } = data;
  const { currentPage, pageCount, year } = pageContext;
  const { t } = useTranslation('category');

  return (
    <React.Fragment>
      <SEO title={`${category.name} -  ${year}`} />
      <Styled.h1>{`${category.name} -  ${year}`}</Styled.h1>
      <Styled.ul className="mt-4">
        {events.nodes.map(event => (
          <li key={event.id}>
            <Styled.a
              as={LocalizedLink}
              to={`/${t('common:eventSlug')}/${event.slug}`}
            >
              {event.title}
            </Styled.a>
          </li>
        ))}
      </Styled.ul>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        contextPage={`${t('common:categorySlug')}/${category.slug}/${t(
          'common:yearSlug'
        )}/${year}`}
      />
    </React.Fragment>
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
