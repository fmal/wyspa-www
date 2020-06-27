import React from 'react';

const CurrentPathContext = React.createContext('/');

export default function CurrentPathProvider(props) {
  return (
    <CurrentPathContext.Provider value={props.path}>
      {props.children}
    </CurrentPathContext.Provider>
  );
}

export function useCurrentPath() {
  return React.useContext(CurrentPathContext);
}
