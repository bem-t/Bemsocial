import { createContext, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";

const INITIAL_STATE = {
 user: 
 JSON.parse(localStorage.getItem("user")) || null,
//  {
//     _id:"6259e687f49d6e576ab71fa6",
//     username: "john",
//     email: "john@gmail.com",
//     profilePicture: "",
//     coverPicture: "",
//     followers: [],
//     followings: [],
//     isAdmin: false,
//   },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
