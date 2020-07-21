/** @jsx jsx */
import { jsx } from 'theme-ui';
import Img from 'gatsby-image';
import { alpha } from '@theme-ui/color';
import { animated } from 'react-spring';

import SvgIcon from './SvgIcon';

const MediaGalleryItem = ({ image, type, title, onClick, style }) => {
  const h = image.presentationHeight;
  const count = Math.floor(h / 50);

  return (
    <animated.button
      sx={{
        cursor: 'pointer',
        boxShadow: 'xl',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        height: 0,
        padding: 0,
        border: 0,
        paddingBottom: `${100 / image.aspectRatio}%`,
        gridRowEnd: `span ${count}`,
        mb: 4,
        '&:hover': {
          boxShadow: '2xl',

          "> [data-name='gallery-item-overlay']": {
            opacity: 1
          }
        },
        '&:focus': {
          outline: 'none',
          boxShadow: t => `0 0 0 10px ${alpha('indigo.6', 0.375)(t)}`
        }
      }}
      style={style}
      onClick={onClick}
    >
      <Img fluid={image} alt={title} />
      <div
        data-name="gallery-item-overlay"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: 'opacity 0.3s',
          color: 'white',
          fontSize: 5,
          backgroundImage: t =>
            `linear-gradient(30deg, ${alpha('indigo.7', 0.75)(t)}, ${alpha(
              'indigo.5',
              0.75
            )(t)})`
        }}
      >
        <SvgIcon
          size={39}
          pathData={
            'M12 1.5A1.5 1.5 0 0010.5 0h-9c-.194 0-.377.04-.547.107L.93.114C.56.266.266.56.114.93L.107.953C.04 1.123 0 1.306 0 1.5v9a1.5 1.5 0 103 0V5.12l6.44 6.44c.292.294.676.44 1.06.44s.768-.146 1.06-.44a1.496 1.496 0 000-2.12L5.12 3h5.38A1.5 1.5 0 0012 1.5zM38.893.953L38.886.93a1.5 1.5 0 00-.816-.816l-.023-.007A1.485 1.485 0 0037.5 0h-9a1.5 1.5 0 100 3h5.38l-6.44 6.44A1.498 1.498 0 0028.5 12c.384 0 .768-.146 1.06-.44L36 5.12v5.38a1.5 1.5 0 103 0v-9c0-.194-.04-.377-.107-.547zM37.5 27a1.5 1.5 0 00-1.5 1.5v5.38l-6.44-6.44a1.498 1.498 0 10-2.12 2.12L33.88 36H28.5a1.5 1.5 0 100 3h9c.194 0 .377-.04.547-.107l.023-.007a1.5 1.5 0 00.816-.816l.007-.023c.067-.17.107-.353.107-.547v-9a1.5 1.5 0 00-1.5-1.5zm-25.94.44a1.496 1.496 0 00-2.12 0L3 33.88V28.5a1.5 1.5 0 10-3 0v9c0 .194.04.377.107.547l.007.023a1.5 1.5 0 00.816.816l.023.007c.17.067.353.107.547.107h9a1.5 1.5 0 100-3H5.12l6.44-6.44a1.498 1.498 0 000-2.12z'
          }
        />
      </div>
      {type === 'embed/youtube' && (
        <div
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(255,255,255,.8)',
            width: 8,
            height: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 'default',
            boxShadow: 'sm',
            fontSize: 2,
            m: 3
          }}
        >
          <SvgIcon
            sx={{ left: '2px' }}
            size={24}
            pathData={'M7 6L7 18 17 12z'}
          />
        </div>
      )}
    </animated.button>
  );
};

export default MediaGalleryItem;
