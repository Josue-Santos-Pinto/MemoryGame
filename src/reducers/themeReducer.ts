import { reducerActionType } from "../types/ReducerActionsType";
import light from "../themes/light";
import dark from "../themes/dark";

export type themeType = {
  theme: typeof light | typeof dark;
};

export const themeInitialState: themeType = {
  theme: light,
};

export const themeReducer = (state: themeType, action: reducerActionType) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return { ...state, theme: action.payload.theme };
  }

  return state;
};
