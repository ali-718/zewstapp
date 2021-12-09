import { ToastError } from "../../../helpers/Toast";
import { client } from "../client";
import { CREATE_ORDER, FETCH_MEALS, FETCH_TABLES } from "./Types";
import moment from "moment";

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

export const createOrder =
  ({ client_id, locationId, catalog, price, discount, customerId }) =>
  (dispatch) => {
    dispatch({ type: CREATE_ORDER.REQUESTED });

    client
      .post(`/manual-orders/addOrder`, {
        client_id,
        locationId,
        catalog,
        timestamp: moment().format("DD-M-yyy"),
        price,
        discount,
        customerId,
        orderType: "Dine-In",
      })
      .then((res) => {
        dispatch({
          type: CREATE_ORDER.SUCCEEDED,
          payload: res.data.orderId,
        });
      })
      .catch((e) => {
        dispatch({ type: CREATE_ORDER.FAILED });
        console.log(e.response.data);
        ToastError(
          e.response.data.err || "Some error occoured,please try again later"
        );
      });
  };

export const payOrderAction = ({ orderId, locationId }) =>
  new Promise((resolve, reject) => {
    console.log(locationId, orderId);
    client
      .post(`/manual-orders/orderpayed`, {
        locationId,
        orderId,
        paymentDetails: "Cash",
      })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
        console.log(e.response.data);
        ToastError("Some error occoured, please try again later");
      });
  });

export const attachOrderToTableAction = ({ orderId, locationId, tableId }) =>
  new Promise((resolve, reject) => {
    client
      .post(`/manual-orders/attachOrderTable`, {
        locationId,
        orderId,
        tableId,
      })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
        console.log(e.response.data);
        ToastError("Some error occoured, please try again later");
      });
  });
