import { createContext, useState } from "react";
// Create a new context
const StateContext = createContext();

// Create a provider component to wrap around components that need access to the context
const ContextProvider = ({ children }) => {
  const [state, setState] = useState(false);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, ContextProvider };
