import { requestActions } from "../requestActions";

export const FETCH_TABLES = requestActions("pos", "FETCH_TABLES");
export const FETCH_MEALS = requestActions("pos", "FETCH_MEALS");
export const CREATE_ORDER = requestActions("pos", "CREATE_ORDER");
export const FETCH_ORDERS = requestActions("pos", "FETCH_ORDERS");
export const UPDATE_ORDER = requestActions("pos", "UPDATE_ORDER");
