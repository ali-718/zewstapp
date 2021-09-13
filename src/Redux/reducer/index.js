import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { mealReducer } from "./MealReducer";

export default combineReducers({
  auth: authReducer,
  meal: mealReducer,
});
