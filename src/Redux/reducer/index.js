import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { mealReducer } from "./MealReducer";
import { systemReducer } from "./SystemReducer";
import { recipeReducer } from "./RecipeReducer";
import { locationReducer } from "./locationReducer";

export default combineReducers({
  auth: authReducer,
  meal: mealReducer,
  system: systemReducer,
  recipe: recipeReducer,
  locations: locationReducer,
});
