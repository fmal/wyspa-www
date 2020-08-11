import { merge } from 'theme-ui';
import { tailwind } from '@theme-ui/presets';

const sharedButtonStyles = {
  variant: 'text.default',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontFamily: 'body',
  fontWeight: 'body',
  transition: 'all 0.3s ease-in-out',
  '&:hover, &:focus': {
    filter: 'saturate(1.5) brightness(1.2)'
  },
  '&:focus': {
    outline: 'none'
  }
};

export default merge(tailwind, {
  useCustomProperties: false,
  colors: {
    text: tailwind.colors.gray[8],
    primary: tailwind.colors.indigo[7],
    secondary: tailwind.colors.teal[6],
    background: tailwind.colors.gray[1],
    textMuted: tailwind.colors.gray[7],
    heading: tailwind.colors.black,
    muted: tailwind.colors.gray[3],
    shadow: tailwind.colors.indigo[2]
  },
  fonts: {
    body: `'Inter var', system-ui, -apple-system, sans-serif`
  },
  fontWeights: {
    body: 350,
    heading: 675,
    bold: 775
  },
  sizes: {
    card: '19rem',
    col: '7rem',
    container: '88rem'
  },
  breakpoints: [...tailwind.breakpoints, '1562px'],
  layout: {
    container: {
      px: [3, 4],
      py: [2, 3]
    },
    list: {
      mt: 2,
      mb: tailwind.sizes[6],
      ml: 3,
      p: 0
    }
  },
  text: {
    heading: {
      color: 'heading'
    },
    default: {
      fontSize: [0, null, 1]
    },
    body: {
      variant: 'text.default',
      hyphens: 'auto'
    },
    italic: {
      fontStyle: 'italic',
      fontSynthesis: 'none'
    },
    bold: {
      fontWeight: 'bold',
      fontSynthesis: 'none'
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: 'wide',
      fontFeatureSettings: `'kern', 'calt', 'cpsp', 'ss01', 'ss02', 'ss03'`
    }
  },
  forms: {
    input: {
      px: [2, null, 3],
      py: 2,
      variant: 'text.default',
      borderRadius: 'default',
      boxShadow: 'sm',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'gray.3',
      lineHeight: 'snug',
      '&:focus': {
        outline: 'none',
        borderColor: 'primary'
      }
    }
  },
  buttons: {
    primary: {
      ...sharedButtonStyles,
      borderRadius: 'full',
      boxShadow: 'default',
      backgroundImage: t =>
        `linear-gradient(15deg, ${t.colors.indigo[7]}, ${t.colors.indigo[5]})`,
      px: 3,
      py: 2
    },
    header: {
      ...sharedButtonStyles,
      backgroundImage: t =>
        `linear-gradient(15deg, ${t.colors.gray[9]}, ${t.colors.gray[6]})`,
      boxShadow: 'sm',
      backgroundColor: 'text',
      borderRadius: 'default',
      px: 2,
      py: 0
    }
  },
  links: {
    social: {
      color: 'text',
      '&:focus, &:hover': {
        color: 'primary'
      }
    }
  },
  styles: {
    root: {
      color: 'text',
      backgroundColor: 'background',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFeatureSettings: `'kern', 'calt', 'ss01', 'ss02', 'ss03'`
    },
    spinner: {
      color: 'white'
    },
    a: {
      color: 'primary',
      textDecoration: 'underline',
      transition: 'all 0.3s ease-in-out',
      '&, &:focus, &:hover': {
        textDecorationColor: t => t.colors.indigo[2],
        textDecorationSkip: 'ink',
        textUnderlinePosition: 'under'
      },
      '&:focus, &:hover': {
        color: 'secondary'
      }
    },
    p: {
      variant: 'text.body',
      m: 0,
      mb: tailwind.sizes[6]
    },
    ul: {
      variant: 'layout.list',
      listStyle: 'none',
      li: {
        variant: 'text.default',
        mb: 1,
        '::before': {
          content: '"-"',
          color: 'gray.6',
          display: 'inline-block',
          position: 'absolute',
          ml: -3
        },
        'ul &': {
          mb: 0
        }
      }
    },
    ol: {
      variant: 'layout.list',
      li: {
        variant: 'text.default',
        mb: 2
      }
    },
    li: {
      '& > ul, & > ol': {
        mb: 0
      }
    },
    h1: {
      variant: 'text.heading',
      fontSize: [3, 4, 5],
      my: 4
    },
    h2: {
      variant: 'text.heading',
      fontSize: [2, 3, 4],
      mt: 4,
      mb: tailwind.sizes[6]
    },
    h3: {
      variant: 'text.heading',
      fontSize: [1, 2, 3],
      mt: 4
    },
    h4: {
      variant: 'text.heading',
      fontSize: 1
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
      mb: 3
    },
    i: {
      variant: 'text.italic'
    },
    em: {
      variant: 'text.italic'
    },
    b: {
      variant: 'text.bold'
    },
    strong: {
      variant: 'text.bold'
    },
    blockquote: {
      borderLeftColor: 'gray.4',
      borderLeftStyle: 'solid',
      borderLeftWidth: '6px',
      mx: 0,
      pl: 4,
      p: {
        fontStyle: 'italic'
      }
    }
  }
});
