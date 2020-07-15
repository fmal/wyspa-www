/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Logo = ({ size, sx, ...props }) => {
  const { t } = useTranslation('common');

  let logoStyles;
  let separatorStyles;
  let titleStartSegmentStyles;
  let titleMiddleSegmentStyles;
  let titleEndSegmentStyles;

  switch (size) {
    case 'normal':
      logoStyles = {
        width: ['5.333333333rem', null, 24],
        height: [16, null, '4.5rem']
      };
      separatorStyles = {
        mx: [3, null, '1.125rem'],
        width: 1
      };
      titleStartSegmentStyles = {
        fontSize: [0, 0, 1],
        letterSpacing: ['wide', null, 'wider']
      };
      titleMiddleSegmentStyles = {
        fontSize: [2, 2, 3],
        letterSpacing: ['0.06em', null, 'wider']
      };
      titleEndSegmentStyles = {
        fontSize: [0, 0, 1],
        letterSpacing: ['wider', null, '0.075em']
      };
      break;
    case 'big':
      logoStyles = {
        width: [24, null, '7.111111111rem'],
        height: ['4.5rem', null, '5.333333333rem']
      };
      separatorStyles = {
        mx: ['1.125rem', null, '1.333333333rem'],
        width: [1, null, '0.333333333rem']
      };
      titleStartSegmentStyles = {
        fontSize: [1, 1, 2],
        letterSpacing: ['wider', null, '0.06em']
      };
      titleMiddleSegmentStyles = {
        fontSize: [3, 3, 4],
        letterSpacing: 'wider'
      };
      titleEndSegmentStyles = {
        fontSize: [1, 1, 2],
        letterSpacing: '0.075em'
      };
      break;
  }

  return (
    <Flex sx={sx} {...props}>
      <div
        sx={{
          flexShrink: 0
        }}
      >
        <svg
          role="img"
          viewBox="0 0 240 180"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-labelledby="title-logo"
          sx={{
            display: 'block',
            ...logoStyles
          }}
        >
          <title id="title-logo">{`${t('title')} logo`}</title>
          <path d="M240 27.51h-18.558l.152 152.49h-86.036V27.51h-30.824l.152 152.49H18.56V27.51H0V0h46.53v152.339h30.38V0h86.327l.153 152.339h30.074V0H240v27.51z" />
        </svg>
      </div>
      <div
        sx={{
          ...separatorStyles,
          flexShrink: 0,
          backgroundColor: 'currentColor'
        }}
      />
      <div
        data-name="app-title"
        sx={{
          variant: 'text.caps',
          lineHeight: 1
        }}
      >
        <span
          sx={{
            ...titleStartSegmentStyles,
            display: 'block',
            fontWeight: 'light'
          }}
        >
          {'Fundacja'}
        </span>
        <span
          sx={{
            ...titleMiddleSegmentStyles,
            display: 'block',
            my: 2,
            fontWeight: 'semibold'
          }}
        >
          {'Wyspa'}
        </span>
        <span
          sx={{
            ...titleEndSegmentStyles,
            display: 'block',
            fontWeight: 'light'
          }}
        >
          {'Progress'}
        </span>
      </div>
    </Flex>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['normal', 'big'])
};

Logo.defaultProps = {
  size: 'normal'
};

export default Logo;
