import produce from "immer";
import { FETCH_TABLES } from "../actions/PosActions/Types";

const initialState = {
  tables: {
    insideTables: [],
    outsideTables: [],
    isLoading: false,
    isError: false,
  },
};

export const posReducer = produce((state = initialState, { payload, type }) => {
  switch (type) {
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
