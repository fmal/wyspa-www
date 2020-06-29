/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer
      sx={{
        flex: 'none',
        pt: 5,
        pb: 4,
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))'
      }}
    >
      <Container>
        <div
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: ['column', 'column', 'row']
          }}
        >
          <span sx={{ variant: 'text.body', color: 'textMuted' }}>
            {'©'} {new Date().getFullYear()} {t('title')}
          </span>
          <SocialMediaLinks sx={{ variant: 'text.body', mt: [2, 0] }} />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
