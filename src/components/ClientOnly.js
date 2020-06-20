import { useIsStatic } from '../providers/IsStatic';

function ClientOnly({ children }) {
  const isStatic = useIsStatic();

  if (isStatic) {
    return null;
  }

  return children;
}

export default ClientOnly;
