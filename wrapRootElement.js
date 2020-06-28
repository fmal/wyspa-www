import React from 'react';

import IsStaticProvider from './src/providers/IsStatic';
import ThemeUIProvider from './src/providers/ThemeUI';

const wrapRootElement = ({ element }) => (
  <ThemeUIProvider>
    <IsStaticProvider>{element}</IsStaticProvider>
  </ThemeUIProvider>
);

export default wrapRootElement;
