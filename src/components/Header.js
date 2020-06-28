/** @jsx jsx */
import { Styled, Container, jsx } from 'theme-ui';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import { useAlternateLinks } from '../providers/AlternateLinks';
import LocalizedLink from '../components/LocalizedLink';

const Header = () => {
  const alternateLinks = useAlternateLinks();
  const { t, i18n } = useTranslation('common');

  return (
    <header sx={{ backgroundColor: 'gray.2' }}>
      <Container>
        <div sx={{ float: 'right' }}>
          {alternateLinks &&
            alternateLinks
              .filter(link => link.language !== i18n.language)
              .map((link, i) => [
                i > 0 && ' | ',
                <Styled.a
                  as={Link}
                  key={i}
                  to={link.path}
                  className="text-gray-900"
                  hrefLang={link.language}
                >
                  {t(link.language)}
                </Styled.a>
              ])}
        </div>
        <Styled.h1>
          <Styled.a as={LocalizedLink} to="/">
            {t('title')}
          </Styled.a>
        </Styled.h1>
      </Container>
    </header>
  );
};

export default Header;
