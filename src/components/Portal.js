import React from 'react';
import { createPortal } from 'react-dom';

import { useIsStatic } from '../providers/IsStatic';

let portalContainer;

const Portal = ({ children }) => {
  const isStatic = useIsStatic();
  const element = React.useRef(
    !isStatic ? document.createElement('div') : null
  );

  React.useEffect(() => {
    if (isStatic) {
      return;
    }

    const { current } = element;
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('portal-container', '');
      document.body.append(portalContainer);
    }
    portalContainer.append(current);

    return () => {
      portalContainer.removeChild(current);
    };
  }, [element, isStatic]);

  if (isStatic) {
    return null;
  }

  return createPortal(children, element.current);
};

export default Portal;
