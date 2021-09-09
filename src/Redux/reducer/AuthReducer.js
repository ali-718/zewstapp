import { SIGNUP, USER } from "../actions/AuthActions/Types";

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
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
