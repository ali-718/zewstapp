import { requestActions } from "../requestActions";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_ALLERGENS = "GET_ALLERGENS";
export const GET_ADDONS = "GET_ADDONS";
export const GET_MEALS = requestActions("meals", "GET_MEALS");
export const ADD_MEAL = requestActions("meals", "ADD_MEAL");
export const DELETE_MEAL = requestActions("meals", "DELETE_MEAL");
export const GET_HOTEL_LOCATIONS = requestActions(
  "meals",
  "GET_HOTEL_LOCATIONS"
);
export const ADD_NEW_LOCATION = requestActions("meals", "ADD_NEW_LOCATION");
