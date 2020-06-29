/** @jsx jsx */
import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { useTrail } from 'react-spring';
import { jsx, Container } from 'theme-ui';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';
import HeaderCategory from '../components/HeaderCategory';
import Card from '../components/Card';

const CategoryArchive = ({ data, pageContext }) => {
  const { events, category } = data;
  const { currentPage, pageCount, year } = pageContext;
  const { t } = useTranslation('category');

  const trail = useTrail(events.nodes.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  return (
    <React.Fragment>
      <SEO title={`${category.name} — ${year}`} />
      <HeaderCategory
        category={category}
        year={year}
        totalCount={events.totalCount}
      />
      <Container
        sx={{
          mt: '-6rem'
        }}
      >
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: [
              '1fr',
              'repeat(auto-fill, minmax(350px, 1fr))'
            ],
            gridGap: 4
          }}
        >
          {trail.map((style, idx) => {
            const event = events.nodes[idx];

            return (
              <Card
                isEventCard
                key={event.id}
                title={event.title}
                image={event.featured_image.localFile.childImageSharp.fluid}
                link={`/${t('common:eventSlug')}/${event.slug}`}
                style={style}
              />
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          contextPage={`${t('common:categorySlug')}/${category.slug}/${t(
            'yearSlug'
          )}/${year}`}
        />
      </Container>
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
      sort: { fields: start_date, order: DESC }
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
        featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 770) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
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
