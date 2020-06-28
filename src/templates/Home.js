import React from 'react';
import { Styled } from 'theme-ui';
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
    <React.Fragment>
      <SEO title={t('title')} />
      <Styled.h1>{t('title')}</Styled.h1>
      <Styled.ul>
        {categories.map(category => (
          <li key={category.id}>
            <Styled.a
              as={LocalizedLink}
              to={`/${t('common:categorySlug')}/${category.slug}`}
            >
              {category.name}
            </Styled.a>
          </li>
        ))}
      </Styled.ul>
    </React.Fragment>
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
