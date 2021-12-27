import produce from "immer";
import {
  IS_MENU_SMALL,
  LANDSCAPE,
  MOBILE,
  PORTRAIT,
  TABLET,
  CHANGE_MENU_INDEX,
} from "../actions/SystemActions/Types";

const initialState = {
  orientation: "",
  device: "",
  isMenuSmall: false,
  menuIndex: 0,
};

export const systemReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case CHANGE_MENU_INDEX: {
        state.menuIndex = payload;
        return;
      }
      case IS_MENU_SMALL: {
        state.isMenuSmall = payload;
        return;
      }
      case MOBILE: {
        state.device = "mobile";
        break;
      }
      case TABLET: {
        state.device = "tablet";
        break;
      }
      case PORTRAIT: {
        state.orientation = "portrait";
        break;
      }
      case LANDSCAPE: {
        state.orientation = "landscape";
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
