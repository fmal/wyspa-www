/** @jsx jsx */
import { jsx } from 'theme-ui';

const Copy = ({ sx, ...props }) => (
  <div sx={{ variant: 'styles', ...sx }} {...props}>
    {props.children}
  </div>
);

export default Copy;
