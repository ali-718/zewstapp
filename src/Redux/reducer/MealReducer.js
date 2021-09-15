import produce from "immer";
import { USER } from "../actions/AuthActions/Types";
import {
  ADD_MEAL,
  GET_ADDONS,
  GET_ALLERGENS,
  GET_CATEGORIES,
  GET_MEALS,
} from "../actions/HomeActions/Types";

const initialState = {
  categories: [],
  addons: [],
  allergens: [],
  hotel: {
    hotels: [],
    isLoading: false,
    isError: false,
  },
  addMeal: {
    isLoading: false,
    isError: false,
  },
};

export const mealReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case ADD_MEAL.REQUESTED: {
        state.addMeal.isLoading = true;
        state.addMeal.isError = false;
        break;
      }
      case ADD_MEAL.SUCCEEDED: {
        state.addMeal.isLoading = false;
        state.addMeal.isError = false;
        break;
      }
      case ADD_MEAL.FAILED: {
        state.addMeal.isLoading = false;
        state.addMeal.isError = true;
        break;
      }
      case GET_MEALS.REQUESTED: {
        const index = state.hotel.hotels.findIndex(
          (item) => item.id === payload.id
        );

        if (index !== -1) {
          state.hotel.hotels[index] = {
            ...state.hotel.hotels[index],
            meal: {
              ...state.hotel.hotels[index].meal,
              isLoading: true,
              isError: false,
            },
          };
        }
        break;
      }

      case GET_MEALS.SUCCEEDED: {
        const index = state.hotel.hotels.findIndex(
          (item) => item.id === payload.id
        );

        if (index !== -1) {
          state.hotel.hotels[index] = {
            ...state.hotel.hotels[index],
            meal: {
              isLoading: false,
              isError: false,
              meals: payload.meals,
            },
          };
        }
        break;
      }

      case GET_MEALS.FAILED: {
        const index = state.hotel.hotels.findIndex(
          (item) => item.id === payload.id
        );

        if (index !== -1) {
          state.hotel.hotels[index] = {
            ...state.hotels[index],
            meal: {
              isLoading: false,
              isError: true,
              ...state.hotel.hotels[index].meal,
            },
          };
        }
        break;
      }
      case USER: {
        state.hotel.hotels = [
          ...state.hotel.hotels,
          {
            name: payload.user.clientName,
            location: payload.user?.locationName,
            id: payload.user?.locationId,
            owner: payload.user?.owner_name,
            meal: {
              isLoading: false,
              isError: false,
              meals: [],
            },
          },
        ];
        state.hotel.isLoading = false;
        state.hotel.isError = false;
        break;
      }
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
