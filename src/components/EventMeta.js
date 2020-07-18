/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import Item from './EventMetaItem';
import SvgIcon from './SvgIcon';

const EventMeta = ({ event }) => {
  const { t } = useTranslation('event');

  let locationsMarkup;
  if (event.locations.length > 0) {
    locationsMarkup = (
      <React.Fragment>
        <ul sx={{ variant: 'styles.ul', mb: 0 }}>
          {event.locations.map(location => (
            <li sx={{ mt: 2, mb: '0 !important' }} key={location.name}>
              {location.name}
              <span sx={{ display: 'block', color: 'textMuted' }}>
                {location.address}
              </span>
              <span sx={{ display: 'block', mt: 1 }}>
                <Styled.a
                  href={location.map_url}
                  sx={{ display: 'inline-flex', alignItems: 'center' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SvgIcon
                    size={20}
                    pathData={
                      'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                    }
                    sx={{ flexShrink: 0, mr: 1, color: 'text' }}
                  />
                  {t('seeOnMap')}
                </Styled.a>
              </span>
            </li>
          ))}
        </ul>
        {event.free_admission && (
          <div
            sx={{
              mt: [2, null, null, 3],
              ml: 3,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SvgIcon
              size={20}
              pathData={
                'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              }
              sx={{ flexShrink: 0, mr: 1 }}
            />
            {t('freeAdmission')}
          </div>
        )}
      </React.Fragment>
    );
  }

  let openingHoursMarkup;
  if (event.opening_hours.length > 0) {
    openingHoursMarkup = (
      <ul sx={{ variant: 'styles.ul', mb: 0 }}>
        {event.opening_hours.filter(Boolean).map((hours, idx) => (
          <li sx={{ mb: '0 !important' }} key={idx}>
            {hours}
          </li>
        ))}
      </ul>
    );
  }

  let eventDatesMarkup;
  if (event.start_date != null && event.end_date != null) {
    eventDatesMarkup = (
      <Item
        name={t('date')}
        content={`${event.start_date} – ${event.end_date}`}
      />
    );
  } else if (event.start_date != null) {
    eventDatesMarkup = (
      <Item name={t('date')} content={event.start_date_full} />
    );
  }

  return (
    <aside
      sx={{
        mb: [1, 2],
        display: 'grid',
        gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', null, '1fr']
      }}
    >
      {eventDatesMarkup}
      {openingHoursMarkup != null && (
        <Item name={t('openingHours')} content={openingHoursMarkup} />
      )}
      {event.curators.length > 0 && (
        <Item name={t('curators')} content={event.curators.join(', ')} />
      )}
      {locationsMarkup != null && (
        <Item name={t('location')} content={locationsMarkup} />
      )}
    </aside>
  );
};

export default EventMeta;
