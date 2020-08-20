/** @jsx jsx */
import React from 'react';
import { jsx, Container } from 'theme-ui';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { useTrail } from 'react-spring';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Card from '../components/Card';
import Header from '../components/HeaderHome';

const Home = ({ data }) => {
  const {
    directusAboutUs: aboutUsData,
    directusArtLab: artLabData,
    directusOnePercent: onePercentData
  } = data;
  const [categoriesGroup, archiveCategoriesGroup] = data.categoryGroup.group;
  const categories = categoriesGroup?.nodes;
  const archiveCategories = archiveCategoriesGroup?.nodes;

  const { t } = useTranslation('home');

  const cardsData = [
    {
      id: aboutUsData.id,
      name: t('aboutUs:title'),
      link: `/${t('common:aboutUsSlug')}/`,
      image: aboutUsData.image
    },
    {
      id: artLabData.id,
      name: t('artLab:title'),
      link: `/${t('common:artLabSlug')}/`,
      image: artLabData.image
    },
    ...categories,
    {
      id: onePercentData.id,
      name: t('onePercent:title'),
      link: `/${t('common:onePercentSlug')}/`,
      image: onePercentData.image
    },
    ...(archiveCategories != null ? archiveCategories : [])
  ];

  const trail = useTrail(cardsData.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  return (
    <React.Fragment>
      <SEO title={t('title')} />
      <Header />
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: theme => [
            '1fr',
            `repeat(auto-fill, minmax(${theme.sizes.card}, 1fr))`
          ],
          gridGap: 4
        }}
      >
        {trail.map((style, idx) => {
          const data = cardsData[idx];

          let image;
          if (data.image != null) {
            image = data.image.localFile.childImageSharp.fluid;
          } else if (data.lastEvent != null) {
            image =
              data.lastEvent.featured_image.localFile.childImageSharp.fluid;
          }

          return (
            <Card
              key={data.id}
              title={data.name}
              image={image}
              isExternal={data.is_external}
              externalUrl={data.external_url}
              link={
                data.link
                  ? data.link
                  : `/${t('common:categorySlug')}/${data.slug}`
              }
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
    categoryGroup: allDirectusCategory(
      sort: { fields: [order, created_date], order: [ASC, DESC] }
      filter: {
        show_on_home: { eq: true }
        translations: { elemMatch: { language: { eq: $language } } }
      }
    ) {
      group(field: is_archive) {
        isArchive: fieldValue
        nodes {
          id
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 720) {
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
          is_external
          is_archive
          external_url
          lastEvent {
            featured_image {
              localFile {
                id
                childImageSharp {
                  fluid(maxWidth: 720) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    directusAboutUs {
      id
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 720) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    directusArtLab {
      id
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 720) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    directusOnePercent {
      id
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 720) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default localize(Home);
