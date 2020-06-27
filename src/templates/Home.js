import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import localize from '../components/localize';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';

const Home = ({ data }) => {
  const {
    allDirectusCategory: { nodes: categories = [] }
  } = data;

  const { t } = useTranslation('home');

  return (
    <>
      <SEO title={t('title')} />
      <h1 className="m-0 text-xl">{t('title')}</h1>
      <ul className="mt-4">
        {categories.map(category => (
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
      sort: { fields: [order, created_date], order: [ASC, DESC] }
      filter: {
        show_on_home: { eq: true }
        translations: { elemMatch: { language: { eq: $language } } }
      }
    ) {
      nodes {
        id
        translations {
          language
          name
          slug
        }
        lastEvent {
          featured_image {
            localFile {
              id
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default localize(Home);
