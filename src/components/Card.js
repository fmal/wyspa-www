/** @jsx jsx */
import { jsx, Link, Heading } from 'theme-ui';
import Img from 'gatsby-image';
import { alpha } from '@theme-ui/color';
import { animated } from 'react-spring';

import LocalizedLink from './LocalizedLink';

const Card = ({ image, title, link, style, isEventCard = false }) => {
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
          '> div': {
            height: '100%',
            left: 0,
            position: 'absolute !important',
            top: 0,
            width: '100%',
            '> div': {
              position: 'static !important'
            }
          }
        }}
      >
        <Img fluid={image} />
      </div>
      <Link
        as={LocalizedLink}
        aria-label={`Visit ${title} project page`}
        to={link}
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
            textDecoration: 'none',
            outline: 'none',
            boxShadow: t => `0 0 0 10px ${alpha('indigo.6', 0.375)(t)}`
          },
          '&:hover': {
            textDecoration: 'none',
            '&:after': {
              opacity: 0
            }
          }
        }}
      >
        <Heading
          as="h2"
          sx={{
            fontSize: isEventCard ? [1, 2] : [2, 4],
            fontWeight: 'bold',
            color: 'white',
            textShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 12px'
          }}
        >
          {title}
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
            `linear-gradient(30deg, ${t.colors.indigo[7]}, ${t.colors.indigo[5]})`
        }}
      />
    </animated.div>
  );
};

export default Card;
