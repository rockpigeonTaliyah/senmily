import React, { createContext, useState } from 'react';

// Create the state context
export const StateContext = createContext();

// Create a provider component to wrap the components that need access to the state
export function StateProvider({ children }) {
  const [sharedState, setSharedState] = useState('');

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
}