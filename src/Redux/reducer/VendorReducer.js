import produce from "immer";
import {
  ADD_VENDOR,
  DELETE_VENDOR,
  FETCH_DEPOT,
  FETCH_VENDOR,
} from "../actions/VendorActions/Types";

const initialState = {
  vendors: {
    isLoading: false,
    isError: false,
    list: [],
  },
  addVendors: {
    isLoading: false,
    isError: false,
  },
  deleteVendors: {
    isLoading: false,
    isError: false,
  },
  depot:{
    isLoading: false,
    isError: false,
    list: [],
  }
};

export const vendorReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case FETCH_DEPOT.REQUESTED: {
        state.depot.isLoading = true;
        state.depot.isError = false;
        break;
      }
      case FETCH_DEPOT.SUCCEEDED: {
        state.depot.isLoading = false;
        state.depot.isError = false;
        state.depot.list = payload;
        break;
      }
      case FETCH_DEPOT.FAILED: {
        state.depot.isLoading = false;
        state.depot.isError = true;
        break;
      }
      case DELETE_VENDOR.REQUESTED: {
        state.deleteVendors.isLoading = true;
        state.deleteVendors.isError = false;
        break;
      }
      case DELETE_VENDOR.SUCCEEDED: {
        state.deleteVendors.isLoading = false;
        state.deleteVendors.isError = false;
        break;
      }
      case DELETE_VENDOR.FAILED: {
        state.deleteVendors.isLoading = false;
        state.deleteVendors.isError = false;
        break;
      }
      case ADD_VENDOR.REQUESTED: {
        state.addVendors.isLoading = true;
        state.addVendors.isError = false;
        break;
      }
      case ADD_VENDOR.SUCCEEDED: {
        state.addVendors.isLoading = false;
        state.addVendors.isError = false;
        break;
      }
      case ADD_VENDOR.FAILED: {
        state.addVendors.isLoading = false;
        state.addVendors.isError = true;
        break;
      }
      case FETCH_VENDOR.REQUESTED: {
        state.vendors.isLoading = true;
        state.vendors.isError = false;
        break;
      }
      case FETCH_VENDOR.SUCCEEDED: {
        state.vendors.isLoading = false;
        state.vendors.isError = false;
        state.vendors.list = payload;
        break;
      }
      case FETCH_VENDOR.FAILED: {
        state.vendors.isLoading = false;
        state.vendors.isError = true;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
