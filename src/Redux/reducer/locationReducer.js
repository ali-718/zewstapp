import produce from "immer";
import { ALL_LOCATION, PRIMARY_LOCATION } from "../actions/AdminActions/Types";
const initialState = {
  locations: [],
  isLoading: false,
  isError: false,
  defaultLocation: {},
};

export const locationReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case PRIMARY_LOCATION: {
        state.defaultLocation = payload;
        break;
      }
      case ALL_LOCATION.REQUESTED: {
        state.isLoading = true;
        state.isError = false;
        break;
      }
      case ALL_LOCATION.SUCCEEDED: {
        state.locations = payload;
        state.isLoading = false;
        state.isError = false;
        break;
      }
      case ALL_LOCATION.FAILED: {
        state.isLoading = false;
        state.isError = true;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
