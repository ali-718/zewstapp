import produce from "immer";
import {
  CREATE_ORDER,
  FETCH_MEALS,
  FETCH_ORDERS,
  FETCH_TABLES,
} from "../actions/PosActions/Types";

const initialState = {
  tables: {
    insideTables: [],
    outsideTables: [],
    isLoading: false,
    isError: false,
  },
  meal: {
    categories: [],
    meals: [],
    isLoading: false,
    isError: false,
  },
  createOrder: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    orderId: "",
  },
  orders: {
    orders: [],
    isLoading: false,
    isError: false,
  },
};

export const posReducer = produce((state = initialState, { payload, type }) => {
  switch (type) {
    case FETCH_ORDERS.REQUESTED: {
      state.orders.isLoading = true;
      state.orders.isError = false;
      break;
    }
    case FETCH_ORDERS.SUCCEEDED: {
      state.orders.isLoading = false;
      state.orders.isError = false;
      state.orders.orders = payload?.dineInOrdersCreated;
      break;
    }
    case FETCH_ORDERS.FAILED: {
      state.orders.isLoading = false;
      state.orders.isError = true;
      state.orders.orders = [];
      break;
    }
    case CREATE_ORDER.REQUESTED: {
      state.createOrder.isLoading = true;
      state.createOrder.isError = false;
      state.createOrder.isSuccess = false;
      state.createOrder.orderId = "";
      break;
    }
    case CREATE_ORDER.SUCCEEDED: {
      state.createOrder.isLoading = false;
      state.createOrder.isError = false;
      state.createOrder.isSuccess = true;
      state.createOrder.orderId = payload;
      break;
    }
    case CREATE_ORDER.FAILED: {
      state.createOrder.isLoading = false;
      state.createOrder.isError = true;
      state.createOrder.isSuccess = false;
      state.createOrder.orderId = "";
      break;
    }
    case FETCH_MEALS.REQUESTED: {
      state.meal.isLoading = true;
      state.meal.isError = false;
      state.createOrder.isSuccess = false;
      state.meal.meals = [];
      break;
    }
    case FETCH_MEALS.SUCCEEDED: {
      state.meal.isLoading = false;
      state.meal.isError = false;

      if (Object.keys(payload).length > 0) {
        state.meal.categories = Object.keys(payload);
        Object.values(payload).map((item) => {
          state.meal.meals = [...state.meal.meals, ...item];
        });
      }
      break;
    }
    case FETCH_MEALS.FAILED: {
      state.meal.isLoading = false;
      state.meal.isError = true;
      break;
    }
    case FETCH_TABLES.REQUESTED: {
      if (payload) {
        state.tables.isLoading = true;
      }
      state.tables.isError = false;
      break;
    }
    case FETCH_TABLES.SUCCEEDED: {
      state.tables.isLoading = false;
      state.tables.isError = false;
      state.tables.insideTables = payload.insideTables;
      state.tables.outsideTables = payload.outsideTables;
      break;
    }
    case FETCH_TABLES.FAILED: {
      state.tables.isLoading = false;
      state.tables.isError = true;
      state.tables.insideTables = [];
      state.tables.outsideTables = [];
      break;
    }
    default:
      return state;
  }
  return state;
});
