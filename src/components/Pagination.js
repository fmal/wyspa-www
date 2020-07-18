/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Box, Styled } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import LocalizedLink from './LocalizedLink';
import SvgIcon from './SvgIcon';

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
          <Styled.a
            as={LocalizedLink}
            to={prevPage}
            rel="prev"
            sx={{
              variant: 'text.default',
              py: 2,
              px: 1,
              textDecoration: 'none',
              svg: {
                transition:
                  'transform 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
              },
              '&:hover, &:focus': {
                span: {
                  textDecoration: 'underline'
                },
                svg: {
                  transform: 'translateX(-6px)'
                }
              }
            }}
          >
            <div sx={{ display: 'flex', alignItems: 'center' }}>
              <SvgIcon
                size={20}
                pathData={
                  'M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                }
                sx={{ flexShrink: 0, mr: [1, 2] }}
              />
              <span>{t('previousPage')}</span>
            </div>
          </Styled.a>
        )}
        {!isLast && (
          <Styled.a
            as={LocalizedLink}
            to={nextPage}
            rel="next"
            sx={{
              variant: 'text.default',
              py: 2,
              px: 1,
              ml: 'auto',
              textDecoration: 'none',
              svg: {
                transition:
                  'transform 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
              },
              '&:hover, &:focus': {
                span: {
                  textDecoration: 'underline'
                },
                svg: {
                  transform: 'translateX(6px)'
                }
              }
            }}
          >
            <div sx={{ display: 'flex', alignItems: 'center ' }}>
              <span>{t('nextPage')}</span>
              <SvgIcon
                size={20}
                pathData={
                  'M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                }
                sx={{ flexShrink: 0, ml: [1, 2] }}
              />
            </div>
          </Styled.a>
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
