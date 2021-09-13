import produce from "immer";
import {
  GET_ADDONS,
  GET_ALLERGENS,
  GET_CATEGORIES,
} from "../actions/HomeActions/Types";

const initialState = {
  categories: [],
  addons: [],
  allergens: [],
};

export const mealReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case GET_CATEGORIES: {
        state.categories = payload;
        break;
      }
      case GET_ALLERGENS: {
        state.allergens = payload;
        break;
      }
      case GET_ADDONS: {
        state.addons = payload;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
