import React from 'react';

const HasMountedContext = React.createContext();

export default function HasMountedProvider(props) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <HasMountedContext.Provider value={hasMounted}>
      {props.children}
    </HasMountedContext.Provider>
  );
}

export function useHasMounted() {
  const context = React.useContext(HasMountedContext);
  if (context === undefined) {
    throw new Error('useHasMounted must be used within a HasMountedProvider');
  }

  return context;
}
