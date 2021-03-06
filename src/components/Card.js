/** @jsx jsx */
import { jsx, Link, Heading } from 'theme-ui';
import Img from 'gatsby-image';
import { alpha } from '@theme-ui/color';
import { animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import LocalizedLink from './LocalizedLink';

const Card = ({
  image,
  title,
  link,
  style,
  externalUrl,
  isExternal = false,
  isEventCard = false,
  isOngoing = false
}) => {
  const { t } = useTranslation('event');

  return (
    <animated.div
      sx={{
        position: 'relative',
        boxShadow: 'xl',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:before': {
          content: '""',
          display: 'block',
          paddingTop: '100%'
        },
        '&:hover': {
          transform: 'translateY(-5px) !important',
          boxShadow: '2xl',
          "> [data-name='card-overlay']": {
            opacity: 0.75
          }
        }
      }}
      style={style}
    >
      <div
        sx={{
          '> .gatsby-image-wrapper': {
            height: '100%',
            left: 0,
            position: 'absolute !important',
            top: 0,
            width: '100%'
          }
        }}
      >
        {image && <Img fluid={image} />}
      </div>
      <Link
        as={isExternal ? 'a' : LocalizedLink}
        to={isExternal ? undefined : link}
        href={isExternal ? externalUrl : undefined}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 3,
          zIndex: 1,
          color: 'white',
          textDecoration: 'none !important',
          '&:after': {
            content: `""`,
            position: 'absolute',
            display: 'block',
            width: '100%',
            height: '50%',
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))',
            zIndex: -1,
            transition: 'opacity 0.3s'
          },
          '&:focus': {
            outline: 'none',
            boxShadow: t => `0 0 0 10px ${alpha('indigo.6', 0.375)(t)}`
          },
          '&:hover': {
            '&:after': {
              opacity: 0
            },
            "[data-name='card-link-text']": {
              backgroundColor: 'indigo.8'
            }
          }
        }}
      >
        <Heading
          as="h2"
          sx={{
            [`m${isEventCard ? 'r' : 'l'}`]: 2,
            textAlign: isEventCard ? 'left' : 'right',
            variant: isEventCard ? undefined : 'text.caps',
            fontSize: isEventCard ? [1, 2] : [2, 3],
            color: 'white',
            textShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 12px'
          }}
        >
          <span
            data-name="card-link-text"
            sx={{
              py: '0.0125em',
              px: '0.125em',
              boxDecorationBreak: 'clone',
              transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {title}
          </span>
        </Heading>
      </Link>
      <div
        data-name="card-overlay"
        sx={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          opacity: 0,
          transition: 'opacity 0.3s',
          backgroundImage: t =>
            `linear-gradient(30deg, ${t.colors.indigo[6]}, ${t.colors.indigo[3]})`
        }}
      />
      {isOngoing && (
        <div
          sx={{
            variant: 'text.caps',
            position: 'absolute',
            top: 2,
            right: 2,
            backgroundColor: 'rgba(0,0,0,.95)',
            fontWeight: 'medium',
            color: 'white',
            fontSize: '0.675rem',
            py: 1,
            px: 2
          }}
        >
          {t('ongoing')}
        </div>
      )}
    </animated.div>
  );
};

export default Card;
