/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';

const EventInfoItem = ({ name, content }) => {
  const { theme } = useThemeUI();

  return (
    <div
      sx={{
        '&:not(:first-of-type)': {
          borderTopColor: 'black',
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
          pt: 2
        },
        [`@media screen and (min-width: ${theme.breakpoints[0]})`]: {
          '&:nth-of-type(2)': {
            borderTopWidth: 0,
            pt: 0
          }
        },
        [`@media screen and (min-width: ${theme.breakpoints[2]})`]: {
          '&:nth-of-type(2)': {
            borderTopWidth: '1px',
            pt: 2
          }
        },
        mb: theme => [3, null, theme.sizes[6]]
      }}
    >
      <h2
        sx={{
          m: 0,
          variant: 'text.default',
          fontWeight: 'medium',
          color: 'gray.9'
        }}
      >
        {name}
      </h2>
      <div sx={{ variant: 'text.default', mt: 2, pr: 3 }}>{content}</div>
    </div>
  );
};

export default EventInfoItem;
