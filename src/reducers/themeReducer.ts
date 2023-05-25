import { reducerActionType } from "../types/ReducerActionsType";
import light from "../themes/light";
import dark from "../themes/dark";
import { ThemeType } from "../types/ThemeType";

export const themeInitialState: ThemeType = {
  theme: light,
};

export const themeReducer = (state: ThemeType, action: reducerActionType) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return { ...state, theme: action.payload.theme };
  }

  return state;
};
