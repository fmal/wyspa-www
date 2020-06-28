import { ThemeProvider } from 'theme-ui';
import React from 'react';

import theme from '../theme';

export default function ThemeUIProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
