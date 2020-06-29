/** @jsx jsx */
import React from 'react';
import { jsx, Flex, Styled } from 'theme-ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';

import { useAlternateLinks } from '../providers/AlternateLinks';

const LanguageSelector = props => {
  const { t, i18n } = useTranslation('common');
  const alternateLinks = useAlternateLinks();

  if (alternateLinks == null) {
    return null;
  }

  return (
    <Flex {...props}>
      {alternateLinks
        .filter(link => link.language !== i18n.language)
        .map((link, i) => (
          <React.Fragment key={link.language}>
            {i > 0 && (
              <span aria-hidden sx={{ color: 'textMuted', mx: 2 }}>
                {'·'}
              </span>
            )}
            <Styled.a as={Link} key={i} to={link.path} hrefLang={link.language}>
              {t(link.language)}
            </Styled.a>
          </React.Fragment>
        ))}
    </Flex>
  );
};

export default LanguageSelector;
