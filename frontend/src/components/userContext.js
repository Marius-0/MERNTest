import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

export default UserProvider = ({ user, children }) => {
  const [currUser, setCurrUser] = useState(user)

  return (  
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)