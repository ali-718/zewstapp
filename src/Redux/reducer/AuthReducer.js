import {
  LOGOUT,
  NOTIFICATION_DATA,
  REMOVE_NOTIFICATION_DATA,
  SIGNUP,
  USER,
} from "../actions/AuthActions/Types";
import produce from "immer";

const initialState = {
  user: {},
  notificationData: {},
  isNotification: false,
};

export const authReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case REMOVE_NOTIFICATION_DATA: {
        state.notificationData = {};
        state.isNotification = false;
        break;
      }
      case NOTIFICATION_DATA: {
        state.notificationData = payload;
        state.isNotification = true;
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
