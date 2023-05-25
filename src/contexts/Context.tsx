import { createContext, useReducer } from "react";
import {
  themeInitialState,
  themeType,
  themeReducer,
} from "../reducers/themeReducer";
import { reducerActionType } from "../types/ReducerActionsType";

type initialStateType = {
  theme: themeType;
};
type ContextType = {
  state: initialStateType;
  dispatch: React.Dispatch<any>;
};

const initialState = {
  theme: themeInitialState,
};

export const Context = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
  theme: themeReducer(state.theme, action),
});

export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
