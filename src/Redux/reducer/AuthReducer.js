import {
  LOGOUT,
  NOTIFICATION_DATA,
  SIGNUP,
  USER,
} from "../actions/AuthActions/Types";
import produce from "immer";

const initialState = {
  user: {},
  notificationData: {},
};

export const authReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case NOTIFICATION_DATA: {
        state.notificationData = payload;
        break;
      }
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
      default:
        return state;
    }
    return state;
  }
);
