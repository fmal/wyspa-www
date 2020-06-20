import React from 'react';

const AlternateLinksContext = React.createContext();

export default function AlternateLinksProvider(props) {
  const links = props.pageContext?.alternateLinks ?? [];

  return (
    <AlternateLinksContext.Provider value={links}>
      {props.children}
    </AlternateLinksContext.Provider>
  );
}

export function useAlternateLinks() {
  const context = React.useContext(AlternateLinksContext);
  if (context === undefined) {
    throw new Error(
      'useAlternateLinks must be used within a AlternateLinksProvider'
    );
  }

  return context;
}
