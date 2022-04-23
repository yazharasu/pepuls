import React, { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    err_message: null,
    isAuthenticated: false
};
 
export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    
    useEffect( () => {
      localStorage.setItem("user", JSON.stringify(state.user))
    }, [state] ) 
    
    return (
      <UserContext.Provider 
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          isAuthenticated: true, 
          err_message: state.err_message,
          dispatch
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };

