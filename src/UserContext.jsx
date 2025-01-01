import React, { createContext, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || null);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
