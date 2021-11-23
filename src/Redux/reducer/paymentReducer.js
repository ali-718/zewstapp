import produce from "immer";
import { ADD_STRIPE } from "../actions/PaymentActions/Types";

const initialState = {
  stripe: {
    isLoading: false,
    isError: false,
  },
};

export const paymentReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case ADD_STRIPE.REQUESTED: {
        state.stripe.isError = false;
        state.stripe.isLoading = true;
        break;
      }
      case ADD_STRIPE.SUCCEEDED: {
        state.stripe.isError = false;
        state.stripe.isLoading = false;
        break;
      }
      case ADD_STRIPE.FAILED: {
        state.stripe.isError = false;
        state.stripe.isLoading = false;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
