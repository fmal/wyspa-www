/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { animated } from 'react-spring';

import SocialMediaLinks from './SocialMediaLinks';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import {
  useFadeAnimation,
  useSlideInLeftAndFadeAnimation
} from '../hooks/animations';

const Header = ({ children }) => {
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
            mt: [2, '2.5rem']
          }}
        >
          <LanguageSelector sx={{ variant: 'text.default', mr: [2, 3] }} />
          <SocialMediaLinks sx={{ fontSize: [1, 2, 3] }} showIcons />
        </animated.div>
        <div sx={{ mt: [5, 4], mb: [4, 3, null, 4] }}>
          <animated.div style={logoProps}>
            <Logo size="big" sx={{ color: 'black' }} />
          </animated.div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
