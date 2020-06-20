import React from 'react';

import IsStaticProvider from './src/providers/IsStatic';
import _wrapPageElement from './wrapPageElement';

export const wrapRootElement = ({ element }) => (
  <IsStaticProvider>{element}</IsStaticProvider>
);

export const wrapPageElement = _wrapPageElement;
