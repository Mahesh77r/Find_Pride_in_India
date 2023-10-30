import {React,useState} from "react";
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  
  return (
    <AuthContext.Provider value={"a"}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


