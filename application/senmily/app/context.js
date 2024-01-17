import React, { createContext, useState } from 'react';

// Create the state context
export const StateContext = createContext();
export const FrameContext = createContext();

// Create a provider component to wrap the components that need access to the state
export function StateProvider({ children }) {
  const [sharedState, setSharedState] = useState('https://dummyimage.com/900x450/000/fff');

  return (
    <StateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </StateContext.Provider>
  );
}

export function FrameProvider({ children }) {
  const [sharedFrame, setSharedFrame] = useState("");

  return (
    <FrameContext.Provider value={{ sharedFrame, setSharedFrame }}>
      {children}
    </FrameContext.Provider>
  );
}

