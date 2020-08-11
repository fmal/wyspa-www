import React from 'react';
import { createPortal } from 'react-dom';

import { useIsStatic } from '../providers/IsStatic';

let portalContainer;

const Portal = ({ children }) => {
  const isStatic = useIsStatic();
  const element = React.useRef(null);
  const [canRender, setRenderState] = React.useState(false);

  React.useEffect(() => {
    if (isStatic) {
      return;
    }

    element.current = document.createElement('div');

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('portal-container', '');
      document.body.append(portalContainer);
    }
    portalContainer.append(element.current);

    setRenderState(true);

    return () => {
      portalContainer.removeChild(element.current);
    };
  }, [isStatic]);

  if (isStatic || !canRender) {
    return null;
  }

  return createPortal(children, element.current);
};

export default Portal;
