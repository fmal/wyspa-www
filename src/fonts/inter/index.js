import interRomanWoff2 from './inter-roman-subset.woff2';
import interItalicWoff2 from './inter-italic-subset.woff2';

const interRomanFontFace = `
  @font-face {
    font-family: 'Inter var';
    font-weight: 100 900;
    font-display: swap;
    font-style: normal;
    font-named-instance: 'Regular';
    src:
      url(${interRomanWoff2}) format('woff2-variations'),
      url(${interRomanWoff2}) format('woff2');
  }
`;

const interItalicFontFace = `
  @font-face {
    font-family: 'Inter var';
    font-weight: 100 900;
    font-display: swap;
    font-style: italic;
    font-named-instance: 'Italic';
    src:
      url(${interItalicWoff2}) format('woff2-variations'),
      url(${interItalicWoff2}) format('woff2');
  }
`;

const interFontFaces = interRomanFontFace + interItalicFontFace;

export default interFontFaces;
