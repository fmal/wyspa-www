/** @jsx jsx */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { jsx, Styled, Container } from 'theme-ui';

import SEO from '../components/SEO';

const NotFoundPage = () => {
  const { t } = useTranslation('404');

  return (
    <React.Fragment>
      <SEO title={'404: ' + t('notFound')} />
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div>
          <Styled.h1>{t('notFound')}</Styled.h1>
          <Styled.p>{t('notFoundMessage')}</Styled.p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default NotFoundPage;
