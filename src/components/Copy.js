/** @jsx jsx */
import { jsx } from 'theme-ui';

const Copy = props => (
  <div {...props} sx={{ variant: 'styles' }}>
    {props.children}
  </div>
);

export default Copy;
