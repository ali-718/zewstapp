import produce from "immer";
import { USER } from "../actions/AuthActions/Types";
import {
  ADD_MEAL,
  ADD_NEW_LOCATION,
  DELETE_MEAL,
  GET_ADDONS,
  GET_ALLERGENS,
  GET_CATEGORIES,
  GET_HOTEL_LOCATIONS,
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
  deleteMeal: {
    isLoading: false,
    isError: false,
  },
  addNewLocation: {
    isLoading: false,
    isError: false,
  },
};

export const mealReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case ADD_NEW_LOCATION.REQUESTED: {
        state.addNewLocation.isLoading = true;
        state.addNewLocation.isError = false;
        break;
      }
      case ADD_NEW_LOCATION.SUCCEEDED: {
        state.addNewLocation.isLoading = false;
        state.addNewLocation.isError = false;
        break;
      }
      case ADD_NEW_LOCATION.FAILED: {
        state.addNewLocation.isLoading = false;
        state.addNewLocation.isError = true;
        break;
      }
      case DELETE_MEAL.REQUESTED: {
        state.deleteMeal.isLoading = true;
        state.deleteMeal.isError = false;
        break;
      }

      case DELETE_MEAL.SUCCEEDED: {
        state.deleteMeal.isLoading = false;
        state.deleteMeal.isError = false;

        const hotelIndex = state.hotel.hotels.findIndex(
          (item) => item.id === payload.locationId
        );

        if (hotelIndex !== -1) {
          state.hotel.hotels[hotelIndex].meal.meals = state.hotel.hotels[
            hotelIndex
          ]?.meal?.meals?.filter((item) => item.mealId !== payload.mealId);
        }
        break;
      }
      case DELETE_MEAL.FAILED: {
        state.deleteMeal.isLoading = false;
        state.deleteMeal.isError = true;
        break;
      }
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
        state.hotel.hotels[0] = {
          ...state.hotel.hotels[0],
          meal: {
            ...state.hotel.hotels[0].meal,
            isLoading: true,
            isError: false,
          },
        };

        break;
      }

      case GET_MEALS.SUCCEEDED: {
        state.hotel.hotels[0] = {
          ...state.hotel.hotels[0],
          meal: {
            isLoading: false,
            isError: false,
            meals: payload.meals,
          },
        };

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
            owner: payload.user?.owner_name,
            meal: {
              isLoading: false,
              isError: false,
              meals: [],
            },

            locations: [],
          },
        ];
        state.hotel.isLoading = false;
        state.hotel.isError = false;
        break;
      }
      case GET_HOTEL_LOCATIONS.REQUESTED: {
        state.hotel.isLoading = true;
        state.hotel.isError = false;
        break;
      }
      case GET_HOTEL_LOCATIONS.SUCCEEDED: {
        state.hotel.hotels[0] = {
          ...state.hotel.hotels[0],
          locations: payload.locations.locations.Items,
        };
        state.hotel.isLoading = false;
        state.hotel.isError = false;
        break;
      }
      case GET_HOTEL_LOCATIONS.FAILED: {
        state.hotel.isLoading = false;
        state.hotel.isError = true;
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
