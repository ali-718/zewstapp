import produce from "immer";
import {
  CREATE_ORDER,
  FETCH_MEALS,
  FETCH_ORDERS,
  FETCH_TABLES,
  UPDATE_MEALS,
  UPDATE_ORDER,
  GET_PAYMENT_INTENT_KEY,
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
    isSuccess: false,
    doneOrders: [],
    createdOrders: [],
  },
  paymentIntent: {
    intentKey: null,
    isError: false,
    isLoading: false,
  },
};

export const posReducer = produce((state = initialState, { payload, type }) => {
  switch (type) {
    case UPDATE_ORDER.REQUESTED: {
      const index = state.orders.createdOrders.findIndex(
        (item) => item.orderId === payload.orderId
      );

      if (index > -1) {
        const allOrders = [...state.orders.createdOrders];

        allOrders[index] = {
          ...allOrders[index],
          loading: payload?.isLoading ? true : false,
        };

        state.orders.createdOrders = allOrders;
      }
      state.orders.isSuccess = false;
      break;
    }
    case UPDATE_ORDER.SUCCEEDED: {
      const allOrders = [...state.orders.orders];

      state.orders.orders = allOrders.filter(
        (item) => item.orderId !== payload
      );
      break;
    }
    case UPDATE_MEALS.SUCCEEDED: {
      const allOrders = [...state.orders.createdOrders];
      const index = allOrders.findIndex(
        (item) => item.orderId === payload.orderId
      );

      allOrders[index] = {
        ...allOrders[index],
        catalog: allOrders[index]?.catalog?.map((data) => ({
          ...data,
          served:
            payload.meals?.filter((meal) => meal === data?.mealName).length > 0
              ? true
              : false,
        })),
        loading: false,
      };

      state.orders.createdOrders = allOrders;
      state.orders.isSuccess = true;
      break;
    }
    case UPDATE_ORDER.FAILED: {
      const index = state.orders.orders.findIndex(
        (item) => item.orderId === payload
      );

      if (index > -1) {
        const allOrders = [...state.orders.orders];

        allOrders[index] = { ...allOrders[index], loading: false };

        state.orders.orders = allOrders;
      }
      state.orders.isSuccess = false;
      break;
    }
    case FETCH_ORDERS.REQUESTED: {
      if (payload) {
        state.orders.isLoading = true;
      }
      state.orders.isError = false;
      break;
    }
    case FETCH_ORDERS.SUCCEEDED: {
      const doneOrders = payload?.doneOrders;
      const paidOrders = payload?.paidOrders;
      const createdOrders = payload?.createdOrders;

      state.orders.isLoading = false;
      state.orders.isError = false;
      state.orders.createdOrders = [
        ...createdOrders?.dineInOrdersCreated,
        ...createdOrders?.takeAwayOrdersCreated,
        ...createdOrders?.deliveryOrdersCreated,
      ];
      state.orders.orders = [
        ...paidOrders?.dineInOrdersPaid,
        ...paidOrders?.takeAwayOrdersPaid,
        ...paidOrders?.deliveryOrdersPaid,
      ];
      state.orders.doneOrders = [
        ...doneOrders.dineInOrdersDone,
        ...doneOrders.takeAwayOrdersDone,
        ...doneOrders.deliveryOrdersDone,
      ];
      // state.orders.orders = payload?.dineInOrdersCreated;
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
    case GET_PAYMENT_INTENT_KEY.REQUESTED: {
      state.paymentIntent.isLoading = true;
      state.paymentIntent.isError = false;
      break;
    }
    case GET_PAYMENT_INTENT_KEY.SUCCEEDED: {
      state.paymentIntent.intentKey = payload;
      state.paymentIntent.isLoading = false;
      state.paymentIntent.isError = false;
      break;
    }
    case GET_PAYMENT_INTENT_KEY.FAILED: {
      state.paymentIntent.intentKey = null;
      state.paymentIntent.isLoading = false;
      state.paymentIntent.isError = true;
      break;
    }
    default:
      return state;
  }
  return state;
});
