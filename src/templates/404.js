import React from 'react';
import { useTranslation } from 'react-i18next';

import SEO from '../components/SEO';

const NotFoundPage = () => {
  const { t } = useTranslation('404');

  return (
    <>
      <SEO title={'404: ' + t('notFound')} />
      <h1>{t('notFound')}</h1>
      <p>{t('notFoundMessage')}</p>
    </>
  );
};

export default NotFoundPage;
