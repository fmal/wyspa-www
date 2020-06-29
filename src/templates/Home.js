/** @jsx jsx */
import React from 'react';
import { jsx, Container } from 'theme-ui';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { useTrail } from 'react-spring';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Card from '../components/Card';
import Header from '../components/Header';

const Home = ({ data }) => {
  const {
    allDirectusCategory: { nodes: categories = [] }
  } = data;

  const { t } = useTranslation('home');

  const trail = useTrail(categories.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  return (
    <React.Fragment>
      <SEO title={t('title')} />
      <Header />
      <Container
        sx={{
          mt: '-6rem',
          display: 'grid',
          gridTemplateColumns: ['1fr', 'repeat(auto-fill, minmax(350px, 1fr))'],
          gridGap: 4
        }}
      >
        {trail.map((style, idx) => {
          const category = categories[idx];

          let image;
          if (category.image != null) {
            image = category.image.localFile.childImageSharp.fluid;
          } else if (category.lastEvent != null) {
            image =
              category.lastEvent.featured_image.localFile.childImageSharp.fluid;
          }

          return (
            <Card
              key={category.id}
              title={category.name}
              image={image}
              link={`/${t('common:categorySlug')}/${category.slug}`}
              style={style}
            />
          );
        })}
      </Container>
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
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 770) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
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
                fluid(maxWidth: 770) {
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
