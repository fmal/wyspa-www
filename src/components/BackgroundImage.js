/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import PropTypes from 'prop-types';
import { alpha } from '@theme-ui/color';

const BackgroundImage = ({ imageData }) => {
  const { theme } = useThemeUI();
  const bg = theme.colors.background;
  const shade = alpha('background', 0.4)(theme);

  return (
    <div
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: [`500px`, `600px`, `700px`, `40vw`],
        overflow: 'hidden',
        maxHeight: '100vh',
        zIndex: -1
      }}
    >
      <img
        alt=""
        src={imageData}
        sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          width: '100%',
          height: 'auto',
          opacity: 0.35,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        sx={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: `linear-gradient(to bottom, ${shade} 0%, ${bg} 100%), linear-gradient(135deg, ${shade} 60%, ${bg} 100%), linear-gradient(-135deg, ${shade} 60%, ${bg} 100%)`
        }}
      />
    </div>
  );
};

BackgroundImage.propTypes = {
  imageData: PropTypes.string.isRequired
};

export default BackgroundImage;
