import React from "react";

const AppContext = React.createContext({ user: {}, navigation: {} });

export function AppContextProvider({ user, navigation, children }) {
  return (
    <AppContext.Provider value={{ user: user, navigation: navigation }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
