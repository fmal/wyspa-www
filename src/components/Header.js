/** @jsx jsx */
import { Container, Styled, jsx } from 'theme-ui';
import { animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import SocialMediaLinks from './SocialMediaLinks';
import LanguageSelector from './LanguageSelector';
import LocalizedLink from './LocalizedLink';
import NewsletterSignup from './NewsletterSignup';
import Logo from './Logo';
import {
  useFadeAnimation,
  useSlideInLeftAndFadeAnimation
} from '../hooks/animations';

const Header = ({ children }) => {
  const { t } = useTranslation('common');
  const fadeProps = useFadeAnimation();
  const logoProps = useSlideInLeftAndFadeAnimation();

  return (
    <header>
      <Container>
        <animated.div
          style={fadeProps}
          sx={{
            position: 'relative',
            zIndex: 1,
            float: 'right',
            display: 'flex',
            alignItems: 'center',
            mt: [2, 3, 4]
          }}
        >
          <LanguageSelector sx={{ mr: [3, 4], fontSize: [0, null, 1] }} />
          <NewsletterSignup />
          <SocialMediaLinks sx={{ fontSize: [1, 2, 3] }} showIcons />
        </animated.div>
        <div sx={{ mt: [5, 2, '1.25rem'], mb: [3, 2, null, 3] }}>
          <animated.div style={logoProps}>
            <Styled.a
              as={LocalizedLink}
              to="/"
              rel="home"
              aria-label={t('backToHome')}
              sx={{
                color: 'black',
                textDecoration: 'none !important',
                '&:focus, &:hover': {
                  color: 'primary'
                }
              }}
            >
              <Logo />
            </Styled.a>
          </animated.div>
          {children}
        </div>
      </Container>
    </header>
  );
};

export default Header;
