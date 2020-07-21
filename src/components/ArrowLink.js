/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOM: 'bottom'
};

const stylesByDirection = {
  [DIRECTION.LEFT]: {
    transform: 'rotate(180deg)',
    mr: [2, null, null, 3]
  },
  [DIRECTION.RIGHT]: {
    ml: [2, null, null, 3]
  },
  [DIRECTION.BOTTOM]: {
    transformOrigin: 'top left',
    transform: 'rotate(90deg)',
    ml: ['calc(0.5rem + 1em)', null, null, 'calc(0.75rem + 1em)']
  }
};

const ArrowLink = ({ direction = DIRECTION.RIGHT, sx, children, ...props }) => {
  const iconMarkup = (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 16"
      focusable="false"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      sx={{
        overflow: 'hidden',
        height: '1em',
        mb: '-0.125em',
        ...stylesByDirection[direction]
      }}
    >
      <g
        sx={{
          transform: 'translateX(-32px)',
          transition: 'transform 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        }}
      >
        <line x1="0" y1="8" x2="46" y2="8" />
        <polyline points="39.5 1, 46.5 8, 39.5 15" />
      </g>
    </svg>
  );

  return (
    <Styled.a
      sx={{
        '&:hover, &:focus': {
          '> svg > g': {
            transform: 'translateX(0)',
            transitionDuration: '300ms'
          }
        },
        ...sx
      }}
      {...props}
    >
      {direction === DIRECTION.LEFT ? (
        <React.Fragment>
          {iconMarkup}
          {children}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {children}
          {iconMarkup}
        </React.Fragment>
      )}
    </Styled.a>
  );
};

ArrowLink.propTypes = {
  direction: PropTypes.oneOf(Object.values(DIRECTION))
};

export default ArrowLink;
