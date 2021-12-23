import produce from "immer";
import {
  IS_MENU_SMALL,
  IS_MENU_SMALL_CLOSED,
  LANDSCAPE,
  MOBILE,
  PORTRAIT,
  TABLET,
} from "../actions/SystemActions/Types";

const initialState = {
  orientation: "",
  device: "",
  isMenuSmall: false,
};

export const systemReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
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
