import React, { createContext, useReducer } from "react";
import authInitialState from "./initialsStates/authState";
import galleryInitialState from "./initialsStates/galleryInitialState";
import auth from "./reducers/auth";
import gallery from "./reducers/gallery";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [galleryState, galleryDispatch] = useReducer(gallery, galleryInitialState);

  return <GlobalContext.Provider value={
      {authState,galleryState,authDispatch,galleryDispatch}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;