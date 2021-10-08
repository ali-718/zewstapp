import produce from "immer";
import {
  ADD_NEW_LOCATION,
  ALL_LOCATION,
  EDIT_LOCATION,
  PRIMARY_LOCATION,
} from "../actions/AdminActions/Types";

const initialState = {
  locations: [],
  isLoading: false,
  isError: false,
  defaultLocation: {},
  addLocation: {
    isLoading: false,
    isError: false,
  },
  deleteLocation: {
    isLoading: false,
    isError: false,
  },
};

export const locationReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case PRIMARY_LOCATION: {
        state.defaultLocation = payload;
        break;
      }
      case EDIT_LOCATION.REQUESTED: {
        state.addLocation.isLoading = true;
        state.addLocation.isError = false;
        break;
      }
      case EDIT_LOCATION.SUCCEEDED: {
        state.addLocation.isLoading = false;
        state.addLocation.isError = false;
        break;
      }
      case EDIT_LOCATION.FAILED: {
        state.addLocation.isLoading = false;
        state.addLocation.isError = true;
        break;
      }
      case ADD_NEW_LOCATION.REQUESTED: {
        state.addLocation.isLoading = true;
        state.addLocation.isError = false;
        break;
      }
      case ADD_NEW_LOCATION.SUCCEEDED: {
        state.addLocation.isLoading = false;
        state.addLocation.isError = false;
        break;
      }
      case ADD_NEW_LOCATION.FAILED: {
        state.addLocation.isLoading = false;
        state.addLocation.isError = true;
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
