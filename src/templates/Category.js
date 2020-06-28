import React from 'react';
import { graphql } from 'gatsby';
import { Styled } from 'theme-ui';

import localize from '../components/localize';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

const Category = ({ data, pageContext }) => {
  const { events, category, yearsGroup } = data;
  const { currentPage, pageCount } = pageContext;
  const { t } = useTranslation('category');

  return (
    <React.Fragment>
      <SEO title={category.name} />
      <Styled.h1>{category.name}</Styled.h1>
      <Styled.ul>
        {yearsGroup.group.map(({ year, totalCount }) => (
          <li key={year}>
            <Styled.a
              as={LocalizedLink}
              to={`/${t('common:categorySlug')}/${category.slug}/${t(
                'common:yearSlug'
              )}/${year}`}
            >
              {year} {`(${totalCount})`}
            </Styled.a>
          </li>
        ))}
      </Styled.ul>
      <Styled.ul>
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
        contextPage={`${t('common:categorySlug')}/${category.slug}`}
      />
    </React.Fragment>
  );
};

export const query = graphql`
  query CategoryPageQuery(
    $id: String!
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
    yearsGroup: allDirectusEvent(
      filter: {
        translations: { elemMatch: { language: { eq: $language } } }
        categories: { elemMatch: { id: { eq: $id } } }
      }
    ) {
      group(field: fields___year) {
        year: fieldValue
        totalCount
      }
    }
    events: allDirectusEvent(
      sort: { fields: created_date, order: DESC }
      filter: {
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

export default localize(Category);
