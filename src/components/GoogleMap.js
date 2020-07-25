/** @jsx jsx */
import { jsx, AspectRatio } from 'theme-ui';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ lat, lng, aspectRatio, sx, ...props }) => {
  return (
    <AspectRatio ratio={aspectRatio} sx={sx}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GMAPS_API_KEY }}
        defaultCenter={{
          lat,
          lng
        }}
        {...props}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </AspectRatio>
  );
};

const Marker = () => (
  <div
    sx={{
      position: 'absolute',
      width: 10,
      height: 10,
      borderRadius: 'full',
      backgroundColor: 'black',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}
  >
    <svg
      viewBox="0 0 240 180"
      fill="currentColor"
      aria-hidden="true"
      sx={{ width: 6 }}
    >
      <path d="M240 27.51h-18.558l.152 152.49h-86.036V27.51h-30.824l.152 152.49H18.56V27.51H0V0h46.53v152.339h30.38V0h86.327l.153 152.339h30.074V0H240v27.51z" />
    </svg>
  </div>
);

GoogleMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

GoogleMap.defaultProps = {
  defaultZoom: 11,
  aspectRatio: 4 / 3
};

export default GoogleMap;
