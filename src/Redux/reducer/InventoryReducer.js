import produce from "immer";
import {
  ADD_INVENTORY,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
} from "../actions/InventoryAction/Types";

const initialState = {
  inventory: {
    isLoading: false,
    isError: false,
    list: [],
  },
  addInventory: {
    isLoading: false,
    isError: false,
  },
  deleteInventory: {
    isLoading: false,
    isError: false,
  },
};

export const inventoryReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case DELETE_INVENTORY.REQUESTED: {
        state.deleteInventory.isLoading = true;
        state.deleteInventory.isError = false;
        break;
      }
      case DELETE_INVENTORY.SUCCEEDED: {
        state.deleteInventory.isLoading = false;
        state.deleteInventory.isError = false;
        break;
      }
      case DELETE_INVENTORY.FAILED: {
        state.deleteInventory.isLoading = false;
        state.deleteInventory.isError = true;
        break;
      }
      case FETCH_INVENTORY.REQUESTED: {
        state.inventory.isLoading = true;
        state.inventory.isError = false;
        break;
      }
      case FETCH_INVENTORY.SUCCEEDED: {
        state.inventory.isLoading = false;
        state.inventory.isError = false;
        state.inventory.list = payload;
        break;
      }
      case FETCH_INVENTORY.FAILED: {
        state.inventory.isLoading = false;
        state.inventory.isError = true;
        break;
      }
      case ADD_INVENTORY.REQUESTED: {
        state.addInventory.isLoading = true;
        state.addInventory.isError = false;
        break;
      }
      case ADD_INVENTORY.SUCCEEDED: {
        state.addInventory.isLoading = false;
        state.addInventory.isError = false;
        break;
      }
      case ADD_INVENTORY.FAILED: {
        state.addInventory.isLoading = false;
        state.addInventory.isError = true;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
