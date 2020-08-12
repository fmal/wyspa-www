/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import PropTypes from 'prop-types';
import Obfuscate from 'react-obfuscate';

import SvgIcon from './SvgIcon';

const ObfuscateEmail = ({ email, sx, ...props }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        ...sx
      }}
      {...props}
    >
      <Obfuscate
        sx={{
          variant: 'styles.a',
          pl: t => `calc(1em + ${t.sizes[1]})`,
          "&:hover + [data-name='email-icon'], &:focus + [data-name='email-icon']": {
            color: 'secondary'
          }
        }}
        email={email}
      />
      <SvgIcon
        data-name="email-icon"
        sx={{
          position: 'absolute',
          left: 0,
          top: '.35em',
          color: 'primary',
          pointerEvents: 'none',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </SvgIcon>
    </Box>
  );
};

ObfuscateEmail.propTypes = {
  email: PropTypes.string.isRequired
};

export default ObfuscateEmail;
