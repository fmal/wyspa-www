import React from 'react';

const IsStaticContext = React.createContext();

export default function IsStaticProvider(props) {
  const [isStatic, setIsStatic] = React.useState(true);
  React.useEffect(() => {
    setIsStatic(false);
  }, []);

  return (
    <IsStaticContext.Provider value={isStatic}>
      {props.children}
    </IsStaticContext.Provider>
  );
}

export function useIsStatic() {
  const context = React.useContext(IsStaticContext);
  if (context === undefined) {
    throw new Error('useIsStatic must be used within a IsStaticProvider');
  }

  return context;
}
