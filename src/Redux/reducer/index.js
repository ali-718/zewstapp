import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { mealReducer } from "./MealReducer";
import { systemReducer } from "./SystemReducer";

export default combineReducers({
  auth: authReducer,
  meal: mealReducer,
  system: systemReducer,
});
