import React, { createContext, useContext, useMemo, useReducer } from "react";

import axios from "axios";

const initialState = {
  isLoading: false,
  user: undefined,
  isLogInForm: true,
  room: 0
};

export const Context = createContext({
  state: initialState,
  dispatch: () => {}
});

const reducer = (state, action) => ({ ...state, ...action });

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <Context.Provider value={value} {...props} />;
};

export const useAppContext = () => {
  const context = useContext(Context);
  const { state, dispatch } = context;
  const { isLoading, user, isLogInForm, room } = state;

  const getLoggedIn = () => {
    axios
      .get('http://localhost:5000/auth/loggedin')
      .then(({ data: user }) => {
        dispatch({ ...state, user, isLogInForm: true });
      })
      .catch(() => dispatch({ ...state, user: undefined }));
  };

  const setIsLogInForm = () => dispatch({ ...state, isLogInForm: !isLogInForm })
  const setIsLoading = () => dispatch({ ...state, isLoading: !isLoading });
  const setRoom = (roomID) => dispatch({ ...state, room: roomID });

  return {
    isLoading,
    user,
    isLogInForm,
    room,
    getLoggedIn,
    setIsLoading,
    setIsLogInForm,
    setRoom
  };
};
