import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import localize from '../components/localize';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';

const Home = ({ data }) => {
  const {
    allDirectusCategory: { edges: categories = [] }
  } = data;

  const { t } = useTranslation('home');

  return (
    <>
      <SEO title={t('title')} />
      <h1 className="m-0 text-xl">{t('title')}</h1>
      <ul className="mt-4">
        {categories.map(({ node: category }) => (
          <li key={category.id}>
            <LocalizedLink
              className="text-blue-700"
              to={`/${t('common:categorySlug')}/${category.slug}`}
            >
              {category.name}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export const query = graphql`
  query CategoriesQuery($language: String!) {
    allDirectusCategory(
      filter: { translations: { elemMatch: { language: { eq: $language } } } }
    ) {
      edges {
        node {
          id
          translations {
            language
            name
            slug
          }
        }
      }
    }
  }
`;

export default localize(Home);
