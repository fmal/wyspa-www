/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import { useTrail } from 'react-spring';

import LightBox from './LightBox';
import Item from './MediaGalleryItem';

const MediaGallery = ({ media }) => {
  const [showLightbox, setShowLightbox] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleOpen = i => {
    setShowLightbox(true);
    setSelectedItem(i);
  };
  const handleClose = () => {
    setShowLightbox(false);
    setSelectedItem(null);
  };
  const handlePrevRequest = (i, length) => {
    setSelectedItem((i - 1 + length) % length);
  };
  const handleNextRequest = (i, length) => {
    setSelectedItem((i + 1) % length);
  };

  const trail = useTrail(media.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  if (media.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        sx={{
          mt: 5,
          display: 'grid',
          gridTemplateColumns: theme => [
            '1fr',
            `repeat(auto-fill, minmax(${theme.sizes.card}, 1fr))`
          ],
          gridColumnGap: 4
        }}
      >
        {trail.map((style, idx) => {
          const itemData = media[idx];

          return (
            <Item
              key={itemData.id}
              style={style}
              image={itemData.localFile.childImageSharp.fluid}
              title={itemData.title}
              type={itemData.type}
              onClick={() => handleOpen(idx)}
            />
          );
        })}
      </div>
      {showLightbox && selectedItem !== null && (
        <LightBox
          media={media}
          handleClose={handleClose}
          handleNextRequest={handleNextRequest}
          handlePrevRequest={handlePrevRequest}
          selectedItem={selectedItem}
        />
      )}
    </React.Fragment>
  );
};

MediaGallery.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object)
};

export default MediaGallery;
