import { merge } from 'theme-ui';
import { tailwind } from '@theme-ui/presets';

export default merge(tailwind, {
  useCustomProperties: false,
  colors: {
    text: tailwind.colors.gray[8],
    primary: tailwind.colors.indigo[7],
    secondary: tailwind.colors.blue[7],
    background: tailwind.colors.gray[1],
    textMuted: tailwind.colors.gray[7],
    heading: tailwind.colors.black,
    muted: tailwind.colors.gray[3]
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
    container: 1600
  },
  breakpoints: [...tailwind.breakpoints, '1595px'],
  layout: {
    container: {
      px: [3, 4],
      py: [2, 3]
    },
    list: {
      mt: 2,
      ml: 3,
      p: 0
    }
  },
  text: {
    heading: {
      color: 'heading'
    },
    default: {
      fontSize: [0, 0, 1]
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
    a: {
      color: 'primary',
      textDecoration: 'none',
      transition: 'all 0.3s ease-in-out',
      '&:focus, &:hover': {
        color: 'secondary',
        textDecoration: 'underline'
      }
    },
    p: {
      variant: 'text.body',
      m: 0,
      mb: '1.5rem'
    },
    ul: {
      variant: 'layout.list',
      listStyle: 'none',
      li: {
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
        mb: 3
      }
    },
    li: {
      '& > ul, & > ol': {
        mb: 0
      }
    },
    h1: {
      variant: 'text.heading',
      fontSize: [4, 5, 6],
      my: 4
    },
    h2: {
      variant: 'text.heading',
      fontSize: [3, 4, 5],
      mt: 4,
      mb: '1.5rem'
    },
    h3: {
      variant: 'text.heading',
      fontSize: [2, 3, 4],
      mt: 4
    },
    h4: {
      variant: 'text.heading',
      fontSize: [1, 2, 3]
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1
    },
    h6: {
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
    }
  }
});
