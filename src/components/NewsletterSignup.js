/** @jsx jsx */
import { jsx, Button, Heading } from 'theme-ui';
import { useTranslation } from 'react-i18next';

import Popover from './Popover';
import SignupForm from './SignupForm';

const NewsletterSignup = ({ ...props }) => {
  const { t } = useTranslation('common');

  const triggerMarkup = (
    <Button variant="header" {...props}>
      {'Newsletter'}
    </Button>
  );

  return (
    <Popover
      placement="bottom-end"
      trigger={triggerMarkup}
      sx={{
        mt: 2,
        p: [3, null, 4],
        mx: [1, null, 0],
        maxWidth: 'lg'
      }}
    >
      <Heading sx={{ fontSize: [1, null, 2], mb: 2 }}>
        {t('newsletter.title')}
      </Heading>
      <p sx={{ variant: 'styles.p', color: 'textMuted' }}>
        {t('newsletter.body')}
      </p>
      <SignupForm />
    </Popover>
  );
};

export default NewsletterSignup;
