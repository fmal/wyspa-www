/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Heading, Container } from 'theme-ui';
import { graphql } from 'gatsby';
import { animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import localize from '../components/localize';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Copy from '../components/Copy';
import SvgIcon from '../components/SvgIcon';
import {
  useSlideInDownAndFadeAnimation,
  useFadeAnimation
} from '../hooks/animations';

const OnePercent = ({ data }) => {
  const { t } = useTranslation('onePercent');
  const { directusOnePercent: page } = data;

  const titleProps = useSlideInDownAndFadeAnimation();
  const fadeProps = useFadeAnimation({ delay: 350 });
  const fadePropsDelayed = useFadeAnimation({ delay: 700 });

  return (
    <React.Fragment>
      <SEO title={t('title')} />
      <Header>
        <div
          sx={{
            mt: [4, null, '3.5rem', null, '4rem']
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
              {t('title')}
            </Heading>
          </animated.div>
        </div>
      </Header>
      <Container sx={{ mt: [null, null, 2, 3] }}>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: theme => [
              '1fr',
              `repeat(auto-fill, minmax(${theme.sizes.col}, 1fr))`
            ],
            gridColumnGap: 4
          }}
        >
          <div
            sx={{
              gridColumn: [null, '1 / -1', '1 / -2', '1 / 5', null, '1 / 6']
            }}
          >
            <animated.div style={fadeProps}>
              <Copy dangerouslySetInnerHTML={{ __html: page.body }} />
            </animated.div>
          </div>
          <div
            sx={{
              gridColumn: [null, '1 / -1', '1 / -2', '5 / -1', null, '6 / -1']
            }}
          >
            <animated.div style={fadePropsDelayed}>
              <Heading as="h2" sx={{ fontSize: [1, 2, 3], mb: 3 }}>
                {t('reports')}
              </Heading>
              <ul
                sx={{
                  listStyle: 'none',
                  mb: theme => theme.sizes[6],
                  mt: 0,
                  p: 0
                }}
              >
                {page.attachments.map(attachment => {
                  return (
                    <li
                      key={attachment.id}
                      sx={{ variant: 'text.default', mb: 2 }}
                    >
                      <Styled.a
                        sx={{ display: 'flex', alignItems: 'baseline' }}
                        href={attachment.localFile.publicURL}
                        download
                      >
                        <SvgIcon
                          pathData={
                            'M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                          }
                          sx={{
                            mr: [2, null, null, null, 3],
                            position: 'relative',
                            top: '0.125em'
                          }}
                        />
                        {attachment.title}
                      </Styled.a>
                    </li>
                  );
                })}
              </ul>
            </animated.div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export const query = graphql`
  query OnePercentQuery {
    directusOnePercent {
      translations {
        language
        body
      }
      attachments {
        id
        title
        localFile {
          publicURL
        }
      }
    }
  }
`;

export default localize(OnePercent);
