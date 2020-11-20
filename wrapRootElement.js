import React from 'react';

import HasMountedProvider from './src/providers/HasMounted';
import ThemeUIProvider from './src/providers/ThemeUI';

const wrapRootElement = ({ element }) => (
  <ThemeUIProvider>
    <HasMountedProvider>{element}</HasMountedProvider>
  </ThemeUIProvider>
);

export default wrapRootElement;
