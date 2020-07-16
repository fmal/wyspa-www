/** @jsx jsx */
import React from 'react';
import { jsx, Heading, Container, Styled } from 'theme-ui';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { useTrail, animated } from 'react-spring';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import Card from '../components/Card';
import Copy from '../components/Copy';
import LocalizedLink from '../components/LocalizedLink';
import {
  useFadeAnimation,
  useSlideInDownAndFadeAnimation
} from '../hooks/animations';

const Category = ({ data, pageContext }) => {
  const { events, category, yearsGroup } = data;
  const { currentPage, pageCount } = pageContext;
  const { t } = useTranslation('category');
  const years = yearsGroup?.group;
  const isFirstPage = currentPage === 1;

  const titleProps = useSlideInDownAndFadeAnimation();
  const infoProps = useFadeAnimation({ delay: 500 });
  const trail = useTrail(events.nodes.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  return (
    <React.Fragment>
      <SEO title={category.name} />
      {category.image != null && (
        <BackgroundImage
          imageData={category.image.localFile.childImageSharp.sizes.tracedSVG}
        />
      )}
      <Header>
        <div
          sx={{
            mt: [4, null, '2.5rem', null, '3rem']
          }}
        >
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: [
                '1fr',
                'repeat(auto-fill, minmax(350px, 1fr))'
              ],
              gridColumnGap: 4
            }}
          >
            <div
              sx={{
                gridColumn: [
                  null,
                  '1 / -1',
                  null,
                  '1 / span 2',
                  null,
                  '1 / span 3'
                ]
              }}
            >
              <animated.div style={titleProps}>
                <Heading
                  as="h1"
                  sx={{
                    fontSize: [3, 4, 5],
                    fontWeight: 'heading'
                  }}
                >
                  {category.name}
                </Heading>
              </animated.div>
              <animated.div style={infoProps}>
                {isFirstPage && category.description != null && (
                  <Copy
                    sx={{ mt: 3 }}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: category.description }}
                  />
                )}
                {years && (
                  <div sx={{ mt: [2, null, 3], variant: 'text.body' }}>
                    {years
                      .sort((a, b) => Number(b.year) - Number(a.year))
                      .map(({ year }, i) => (
                        <React.Fragment key={year}>
                          {i > 0 && (
                            <span
                              aria-hidden
                              sx={{ color: 'textMuted', mx: 2 }}
                            >
                              {'·'}
                            </span>
                          )}
                          <Styled.a
                            as={LocalizedLink}
                            to={`/${t('common:categorySlug')}/${
                              category.slug
                            }/${t('common:yearSlug')}/${year}`}
                          >
                            {year}
                          </Styled.a>
                        </React.Fragment>
                      ))}
                  </div>
                )}
              </animated.div>
            </div>
          </div>
        </div>
      </Header>
      <Container>
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
          contextPage={`${t('common:categorySlug')}/${category.slug}`}
        />
      </Container>
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
        description
        language
      }
      image {
        localFile {
          childImageSharp {
            sizes(traceSVG: { color: "#4a5568" }) {
              tracedSVG
            }
          }
        }
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
      }
    }
    events: allDirectusEvent(
      sort: { fields: start_date, order: DESC }
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

export default localize(Category);
