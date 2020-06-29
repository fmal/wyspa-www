/** @jsx jsx */
import { jsx } from 'theme-ui';
import { alpha } from '@theme-ui/color';

const HeaderBackground = () => (
  <div
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: t =>
        `linear-gradient(180deg, ${alpha('indigo.3', 0)(t)} 44.99%, ${alpha(
          'indigo.3',
          0
        )(t)} 45%,  ${alpha('indigo.3', 0.075)(t)})`
    }}
  />
);

export default HeaderBackground;
