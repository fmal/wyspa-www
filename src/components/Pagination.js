import React from 'react';
import PropTypes from 'prop-types';
import { Styled } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import LocalizedLink from './LocalizedLink';

const Pagination = ({ currentPage, pageCount, contextPage }) => {
  const { t } = useTranslation('common');

  if (pageCount <= 1) {
    return null;
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === pageCount;
  const base = `/${contextPage || ''}`;
  const prevPage =
    currentPage - 1 === 1
      ? base
      : `${base}/${t('pageSlug')}/${currentPage - 1}`;
  const nextPage = `${base}/${t('pageSlug')}/${currentPage + 1}`;

  return (
    <React.Fragment>
      {!isFirst && (
        <Styled.a as={LocalizedLink} to={prevPage} rel="prev">
          {t('previousPage')}
        </Styled.a>
      )}
      <span>{t('paginationLocation', { currentPage, pageCount })}</span>
      {!isLast && (
        <Styled.a as={LocalizedLink} to={nextPage} rel="next">
          {t('nextPage')}
        </Styled.a>
      )}
    </React.Fragment>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  contextPage: PropTypes.string
};

export default Pagination;
