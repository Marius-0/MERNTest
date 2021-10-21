import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ user, children }) => {
  const [currUser, setCurrUser] = useState(user);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  console.log("user contz:", UserContext);
  return useContext(UserContext);
};
