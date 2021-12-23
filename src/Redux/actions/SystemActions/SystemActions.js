import { IS_MENU_SMALL } from "./Types";

export const changeOrientationAction =
  ({ type }) =>
  (dispatch) => {
    dispatch({ type });
  };

export const deviceType =
  ({ type }) =>
  (dispatch) => {
    dispatch({ type });
  };

export const setIsMenuSmall =
  ({ isSmall }) =>
  (dispatch) => {
    dispatch({ type: IS_MENU_SMALL, payload: isSmall });
  };
