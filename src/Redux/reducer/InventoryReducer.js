import produce from "immer";
import { ADD_INVENTORY } from "../actions/InventoryAction/Types";

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
