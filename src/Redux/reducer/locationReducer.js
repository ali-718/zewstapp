import produce from "immer";
import { ALL_LOCATION } from "../actions/RecipeActions/Types";

const initialState = {
  locations: [],
  isLoading: false,
  isError: false,
};

export const locationReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
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
