import React from 'react';
import { createPortal } from 'react-dom';

import { useHasMounted } from '../providers/HasMounted';

let portalContainer;

const Portal = ({ children }) => {
  const hasMounted = useHasMounted();
  const element = React.useRef(null);
  const [canRender, setRenderState] = React.useState(false);

  React.useEffect(() => {
    if (!hasMounted) {
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
  }, [hasMounted]);

  if (!hasMounted || !canRender) {
    return null;
  }

  return createPortal(children, element.current);
};

export default Portal;
