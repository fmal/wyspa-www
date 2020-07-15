/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Box } from 'theme-ui';

import uuid from '../utils/uuid';

const SvgIcon = ({ size = 24, title, pathData, sx, ...props }) => {
  const viewBox = [0, 0, size, size].join(' ');
  const titleId = title ? `title-${uuid()}` : null;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
        ...sx
      }}
      {...props}
    >
      <svg
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          maxHeight: '100%',
          pointerEvents: 'none'
        }}
        role={titleId ? 'img' : undefined}
        aria-hidden={titleId == null ? true : undefined}
        viewBox={viewBox}
        aria-labelledby={titleId}
      >
        {titleId && <title id={titleId}>{title}</title>}
        <path d={pathData} />
      </svg>
    </Box>
  );
};

SvgIcon.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string,
  pathData: PropTypes.string.isRequired
};

export default SvgIcon;
