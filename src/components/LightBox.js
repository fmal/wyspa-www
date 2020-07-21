/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import LightboxReact from 'lightbox-react';
import 'lightbox-react/style.css';
import { Global } from '@emotion/core';
import { alpha } from '@theme-ui/color';
import Img from 'gatsby-image';
import YouTube from 'react-youtube';

const commonItemStyles = {
  mx: 'auto',
  maxWidth: theme => `calc(100% - ${theme.sizes['5']})`,
  maxHeight: 'calc(100% - 100px)',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};

const LightBox = ({
  media,
  selectedItem,
  handleClose,
  handlePrevRequest,
  handleNextRequest
}) => {
  const videos = React.useRef(new Map());

  const items = media.reduce((items, item) => {
    if (item.type === 'embed/youtube') {
      items.push(
        <div
          sx={{
            width: '1280px',
            overflow: 'hidden',
            ...commonItemStyles
          }}
        >
          <div
            sx={{
              width: '100%',
              pb: 'calc(100% * 9 / 16)'
            }}
          />
          <YouTube
            opts={{
              width: '1280',
              height: '720',
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                modestbranding: 1
              }
            }}
            onReady={e => videos.current.set(item.id, e.target)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            videoId={item.embed}
          />
        </div>
      );
      return items;
    }

    const { fluid } = item.localFile.childImageSharp;
    items.push(
      <Img
        fluid={fluid}
        sx={{ width: fluid.presentationWidth, ...commonItemStyles }}
        imgStyle={{ objectFit: 'contain' }}
      />
    );

    return items;
  }, []);

  return (
    <React.Fragment>
      <Global
        styles={theme => ({
          '.ril-outer': {
            background: alpha('background', 0.85)(theme)
          },
          '.ril__toolbarItem': {
            color: theme.colors.text,
            fontSize: theme.fontSizes[1]
          },
          [`@media screen and (min-width: ${theme.breakpoints[2]})`]: {
            '.ril__toolbarItem': {
              fontSize: theme.fontSizes[2]
            }
          },
          '.ril-toolbar': {
            background: 'transparent'
          },
          '.ril-close': {
            filter: 'brightness(25%)',

            '&:focus': {
              opacity: 1,
              outline: 'none'
            }
          },
          '.ril__navButtonNext, .ril__navButtonPrev': {
            backgroundColor: alpha('gray.9', 0.4)(theme)
          }
        })}
      />
      <LightboxReact
        enableZoom={false}
        clickOutsideToClose
        mainSrc={items[selectedItem]}
        nextSrc={items[(selectedItem + 1) % items.length]}
        prevSrc={items[(selectedItem + items.length - 1) % media.length]}
        imageTitle={
          media[selectedItem]?.type !== 'embed/youtube'
            ? media[selectedItem].title
            : undefined
        }
        onCloseRequest={handleClose}
        onMovePrevRequest={() => {
          if (videos.current.has(media[selectedItem].id)) {
            videos.current.get(media[selectedItem].id).pauseVideo();
          }

          handlePrevRequest(selectedItem, items.length);
        }}
        onMoveNextRequest={() => {
          if (videos.current.has(media[selectedItem].id)) {
            videos.current.get(media[selectedItem].id).pauseVideo();
          }

          handleNextRequest(selectedItem, items.length);
        }}
      />
    </React.Fragment>
  );
};

export default LightBox;
