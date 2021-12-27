import { requestActions } from "../requestActions";

export const FETCH_FOOD_COUNT = requestActions("dashboard", "FETCH_FOOD_COUNT");
export const LOSS_IN_KITCHEN = requestActions("dashboard", "LOSS_IN_KITCHEN");
export const COST_BY_CATEGORY = requestActions("dashboard", "COST_BY_CATEGORY");
export const FORECASTED_SALES = requestActions("dashboard", "FORECASTED_SALES");
export const DAILY_FOOD_LOG_ADD = requestActions(
  "dashboard",
  "DAILY_FOOD_LOG_ADD"
);
