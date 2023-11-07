import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    _id: "",
    adminName: "",
    email: "",
    password: "",
    role: "",
    mobileNumber: "",
    destinationName: "",
    filename: "",
    path: "",
    verified: "",
    __v: "",
    token: "",
  }); // Initialize user state

  useEffect(() => {
    const storedUserJSON = localStorage.getItem('user');

    if (storedUserJSON) {
      // Parse the JSON string into an object
      const storedUser = JSON.parse(storedUserJSON);

      // Update the 'user' state directly with the new value
      setUser((prevUser) => ({
        ...prevUser,
        _id: storedUser._id,
        adminName: storedUser.adminName,
        email: storedUser.email,
        password: storedUser.password,
        role: storedUser.role,
        mobileNumber: storedUser.mobileNumber,
        destinationName: storedUser.destinationName,
        filename: storedUser.filename,
        path: storedUser.path,
        verified: storedUser.verified,
        __v: storedUser._v,
        token: storedUser.token,
      }));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
