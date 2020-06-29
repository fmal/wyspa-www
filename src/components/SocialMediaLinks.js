/** @jsx jsx */
import { jsx, Flex, Styled } from 'theme-ui';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SvgIcon from './SvgIcon';

const SocialMediaLinks = ({ showIcons = false, ...props }) => {
  const { socialLinks } = useStaticQuery(graphql`
    query {
      socialLinks: allDirectusSocialLink {
        nodes {
          icon_path
          title
          url
          id
        }
      }
    }
  `);

  if (showIcons) {
    return (
      <Flex {...props}>
        {socialLinks.nodes.map((link, i) => (
          <Styled.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.title}
            sx={{ variant: 'links.social', ml: 3 }}
          >
            <SvgIcon pathData={link.icon_path} sx={{ display: 'block' }} />
          </Styled.a>
        ))}
      </Flex>
    );
  }

  return (
    <Flex {...props}>
      {socialLinks.nodes.map((link, i) => (
        <React.Fragment key={link.id}>
          {i > 0 && (
            <span aria-hidden sx={{ color: 'textMuted', mx: 2 }}>
              {'·'}
            </span>
          )}
          <Styled.a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </Styled.a>
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default SocialMediaLinks;
