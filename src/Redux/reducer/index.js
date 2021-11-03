import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { mealReducer } from "./MealReducer";
import { systemReducer } from "./SystemReducer";
import { recipeReducer } from "./RecipeReducer";
import { locationReducer } from "./locationReducer";
import { employeeReducer } from "./EmployeeReducer";
import { inventoryReducer } from "./InventoryReducer";
import { dashboardReducer } from "./DashboardReducer";

export default combineReducers({
  auth: authReducer,
  meal: mealReducer,
  system: systemReducer,
  recipe: recipeReducer,
  locations: locationReducer,
  employee: employeeReducer,
  inventory: inventoryReducer,
  dashboard: dashboardReducer,
});
