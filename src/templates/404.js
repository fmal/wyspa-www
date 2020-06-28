import React from 'react';
import { useTranslation } from 'react-i18next';
import { Styled } from 'theme-ui';

import SEO from '../components/SEO';

const NotFoundPage = () => {
  const { t } = useTranslation('404');

  return (
    <React.Fragment>
      <SEO title={'404: ' + t('notFound')} />
      <Styled.h1>{t('notFound')}</Styled.h1>
      <Styled.p>{t('notFoundMessage')}</Styled.p>
    </React.Fragment>
  );
};

export default NotFoundPage;
