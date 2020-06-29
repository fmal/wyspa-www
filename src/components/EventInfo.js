/** @jsx jsx */
import { Flex, jsx } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import Item from './EventInfoItem';

const ProjectInfo = ({ event }) => {
  const { t } = useTranslation('event');

  return (
    <Flex sx={{ mt: 4, mb: [2, 4], flexWrap: `wrap` }}>
      <Item name={t('start')} content={event.start_date} />
      {event.end_date != null && (
        <Item name={t('end')} content={event.end_date} />
      )}
    </Flex>
  );
};

export default ProjectInfo;
