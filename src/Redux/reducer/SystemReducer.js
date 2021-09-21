import produce from "immer";
import {
  LANDSCAPE,
  MOBILE,
  PORTRAIT,
  TABLET,
} from "../actions/SystemActions/Types";

const initialState = {
  orientation: "",
  device: "",
};

export const systemReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
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
