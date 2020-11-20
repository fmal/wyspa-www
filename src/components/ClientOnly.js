import { useHasMounted } from '../providers/HasMounted';

function ClientOnly({ children }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return children;
}

export default ClientOnly;
