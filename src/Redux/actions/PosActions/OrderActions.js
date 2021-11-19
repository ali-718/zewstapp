import { ToastError } from "../../../helpers/Toast";
import { client } from "../client";
import { FETCH_MEALS, FETCH_TABLES } from "./Types";

export const changeTableStatusAction =
  ({ locationId, tableId, stature, navigation }) =>
  (dispatch) => {
    client
      .post(`/manual-orders/updateTableStatus`, {
        locationId,
        tableId,
        stature,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        ToastError("Some error occoured please try again later!");
      });
  };

export const orderPayAction =
  ({ locationId, orderId, tableId, navigation }) =>
  (dispatch) => {
    client
      .post(`/manual-orders/orderpayed`, {
        locationId,
        orderId,
        paymentDetails: "Cash",
      })
      .then(() => {
        dispatch(changeTableStatusAction({ locationId, tableId, navigation }));
      })
      .catch((e) => {
        reject();
        ToastError("Some error occoured please try again later!");
      });
  };

export const addTableAction = ({ locationId, name, location }) =>
  new Promise((resolve, reject) => {
    client
      .post(`/manual-orders/createTable`, {
        locationId,
        name,
        capacity: 4,
        location,
      })
      .then(() => {
        resolve({ locationId });
      })
      .catch((e) => {
        reject();
        ToastError("Some error occoured please try again later!");
      });
  });

export const fetchMealsAction =
  ({ locationId, reload = true }) =>
  (dispatch) => {
    dispatch({ type: FETCH_MEALS.REQUESTED, payload: reload });

    client
      .get(`manual-orders/findAllMeals/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_MEALS.SUCCEEDED,
          payload: data.meals?.Items,
        });
      })
      .catch((e) => {
        ToastError("Unable to fetch meals, please try again");
        dispatch({ type: FETCH_MEALS.FAILED });
      });
  };

export const fetchTablesAction =
  ({ locationId, reload = true }) =>
  (dispatch) => {
    dispatch({ type: FETCH_TABLES.REQUESTED, payload: reload });

    client
      .get(`/manual-orders/getAllTables/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_TABLES.SUCCEEDED,
          payload: {
            insideTables: data?.data?.insideTables ?? [],
            outsideTables: data?.data?.outsideTables ?? [],
          },
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_TABLES.FAILED });
      });
  };
