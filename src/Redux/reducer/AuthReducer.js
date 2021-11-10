import { LOGOUT, SIGNUP, USER } from "../actions/AuthActions/Types";
import produce from "immer";

const initialState = {
  user: {},
};

export const authReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case LOGOUT: {
        state.user = {};
        break;
      }
      case SIGNUP: {
        state.user.user = payload;
        break;
      }
      case USER: {
        state.user = payload;
        break;
      }
      case "LOGOUT": {
        state.user = {};
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
