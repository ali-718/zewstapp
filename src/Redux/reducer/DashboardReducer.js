import produce from "immer";
import {
  COST_BY_CATEGORY,
  FETCH_FOOD_COUNT,
  LOSS_IN_KITCHEN,
} from "../actions/DashboardActions/Types";

const initialState = {
  firstSection: {
    isLoading: false,
    isError: false,
    menuItems: 0,
    orderItems: 0,
    customerItems: 0,
  },
  lossInKitchen: {
    isLoading: true,
    isError: false,
    list: [],
    totalLoss: 0,
  },
  costByCategory: {
    isLoading: true,
    isError: false,
    list: [],
    totalPrice: 0,
  },
};

export const dashboardReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case COST_BY_CATEGORY.REQUESTED: {
        state.costByCategory.isLoading = true;
        state.costByCategory.isError = false;
        break;
      }
      case COST_BY_CATEGORY.SUCCEEDED: {
        state.costByCategory.isLoading = false;
        state.costByCategory.isError = false;
        state.costByCategory.list = payload.data.catergoryData;
        state.costByCategory.totalPrice = payload.data.total ?? 0;
        break;
      }
      case COST_BY_CATEGORY.FAILED: {
        state.costByCategory.isLoading = false;
        state.costByCategory.isError = true;
        break;
      }
      case LOSS_IN_KITCHEN.REQUESTED: {
        state.lossInKitchen.isLoading = true;
        state.lossInKitchen.isError = false;
        break;
      }
      case LOSS_IN_KITCHEN.SUCCEEDED: {
        state.lossInKitchen.isLoading = false;
        state.lossInKitchen.isError = false;
        state.lossInKitchen.list = payload.data;
        state.lossInKitchen.totalLoss = payload.totalRevenue ?? 0;
        break;
      }
      case LOSS_IN_KITCHEN.FAILED: {
        state.lossInKitchen.isLoading = false;
        state.lossInKitchen.isError = true;
        break;
      }
      case FETCH_FOOD_COUNT.REQUESTED: {
        state.firstSection.isLoading = true;
        state.firstSection.isError = false;
        break;
      }
      case FETCH_FOOD_COUNT.SUCCEEDED: {
        state.firstSection.isLoading = false;
        state.firstSection.isError = false;
        state.firstSection.menuItems = payload.mealCount;
        state.firstSection.orderItems = payload.orderCount;
        state.firstSection.customerItems = payload.customerCount;
        break;
      }
      case FETCH_FOOD_COUNT.FAILED: {
        state.firstSection.isLoading = false;
        state.firstSection.isError = true;
        state.firstSection.menuItems = 0;
        state.firstSection.orderItems = 0;
        state.firstSection.customerItems = 0;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
