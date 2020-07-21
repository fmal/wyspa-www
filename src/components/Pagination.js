/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Box } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import LocalizedLink from './LocalizedLink';
import ArrowLink, { DIRECTION as ARROW_DIRECTION } from './ArrowLink';

const Pagination = ({ currentPage, pageCount, contextPage, sx, ...props }) => {
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
    <Box
      sx={{
        mt: [4, 5],
        position: 'relative',
        ...sx
      }}
      {...props}
    >
      <span
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: ['none', null, 'flex'],
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 0,
          color: 'textMuted'
        }}
      >
        {t('paginationLocation', { currentPage, pageCount })}
      </span>
      <div
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {!isFirst && (
          <ArrowLink
            direction={ARROW_DIRECTION.LEFT}
            as={LocalizedLink}
            to={prevPage}
            rel="prev"
            sx={{
              py: 2,
              px: 1,
              ml: [null, null, -2],
              variant: 'text.default'
            }}
          >
            {t('previousPage')}
          </ArrowLink>
        )}
        {!isLast && (
          <ArrowLink
            as={LocalizedLink}
            to={nextPage}
            rel="next"
            sx={{
              py: 2,
              px: 1,
              ml: 'auto',
              mr: [null, null, -2],
              variant: 'text.default'
            }}
          >
            {t('nextPage')}
          </ArrowLink>
        )}
      </div>
    </Box>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  contextPage: PropTypes.string
};

export default Pagination;
