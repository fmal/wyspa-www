import { merge } from 'theme-ui';
import { tailwind } from '@theme-ui/presets';

export default merge(tailwind, {
  useCustomProperties: false,
  colors: {
    text: tailwind.colors.gray[8],
    primary: tailwind.colors.blue[6],
    background: tailwind.colors.gray[1],
    textMuted: tailwind.colors.gray[7],
    heading: tailwind.colors.black,
    muted: tailwind.colors.gray[3]
  },
  fonts: {
    body: `'Inter var'`,
    heading: 'Amstelvar',
    safe: {
      body: 'system-ui, -apple-system, sans-serif',
      heading: 'system-ui, -apple-system, sans-serif'
    }
  },
  fontWeights: {
    body: 350,
    heading: 625,
    bold: 775
  },
  sizes: {
    container: 1600
  },
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
      color: 'heading',
      fontFeatureSettings: `'kern', 'pnum'`,
      '& > em, & > em > b, & > b > em, & > strong > em, & > em > strong, & > i, & > i > b, & > b > i, & > strong > i, & > i > strong': {
        variant: 'text.italicHeading'
      }
    },
    body: {
      fontSize: [1, 1, 2]
    },
    italic: {
      fontStyle: 'italic',
      fontSynthesis: 'none',
      '@supports (font-variation-settings: normal)': {
        fontVariationSettings: `'slnt' -10`,
        fontStyle: 'oblique 10deg'
      }
    },
    italicHeading: {
      fontStyle: 'italic',
      fontSynthesis: 'none'
    },
    bold: {
      fontWeight: 'bold',
      fontSynthesis: 'none'
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
      m: 0,
      mb: 2
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
        mb: 1
      }
    },
    li: {
      '& > ul, & > ol': {
        mb: 0
      }
    },
    h1: {
      variant: 'text.heading',
      fontSize: [5, 6, 7],
      mt: 2
    },
    h2: {
      variant: 'text.heading',
      fontSize: [4, 5, 6],
      mt: 2
    },
    h3: {
      variant: 'text.heading',
      fontSize: [3, 4, 5],
      mt: 3
    },
    h4: {
      variant: 'text.heading',
      fontSize: [2, 3, 4]
    },
    h5: {
      variant: 'text.heading',
      fontSize: [1, 2, 3]
    },
    h6: {
      variant: 'text.heading',
      fontSize: 1,
      mb: 2
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
