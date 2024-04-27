import React, { createContext, useState } from "react";
import userData from "../data/users.json";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [users, setUsers] = useState(userData);
  return (
    <AppContext.Provider value={{ users, setUsers }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
