/** @jsx jsx */
import { Flex, jsx } from 'theme-ui';

const EventInfoItem = ({ name, content }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      '&:not(:last-of-type)': {
        mr: 5
      },
      mb: 2
    }}
  >
    <div
      sx={{
        textTransform: 'uppercase',
        color: 'gray.6',
        letterSpacing: 'wider',
        fontWeight: 'semibold'
      }}
    >
      {name}
    </div>
    <div sx={{ fontSize: 1, color: 'gray.9' }}>{content}</div>
  </Flex>
);

export default EventInfoItem;
