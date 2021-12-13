import { ToastError } from "../../../helpers/Toast";
import { client } from "../client";
import { CREATE_ORDER, FETCH_MEALS, FETCH_TABLES } from "./Types";
import moment from "moment";

export const changeTableStatusAction = ({ locationId, tableId, stature }) =>
  new Promise((resolve, reject) => {
    console.log({ locationId, tableId, stature });
    client
      .post(`/manual-orders/updateTableStatus`, {
        locationId,
        tableId,
        stature,
      })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
        console.log("Status changing error");
        console.log(e.response.data);
        ToastError(
          e.response.data.err || "Some error occoured, while confirming table"
        );
      });
  });

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
        console.log(res.data);
      })
      .catch((e) => {
        dispatch({ type: CREATE_ORDER.FAILED });
        console.log(e.response.data);
        ToastError(
          e.response.data.err || "Some error occoured, while confirming order"
        );
      });
  };

export const payOrderAction = ({ orderId, locationId }) =>
  new Promise((resolve, reject) => {
    console.log({ locationId, orderId, paymentDetails: "Cash" });
    client
      .post(`/manual-orders/orderPaid`, {
        locationId,
        orderId,
        paymentDetails: "Cash",
      })
      .then(() => {
        resolve();
        console.log("payment created Successfully");
      })
      .catch((e) => {
        reject();
        console.log("order pay error");
        console.log(e.response.data);
        ToastError(
          e.response.data.err || "Some error occoured, while confirming payment"
        );
      });
  });

export const attachOrderToTableAction = ({ orderId, table }) =>
  new Promise((resolve, reject) => {
    console.log({ orderId, table });
    client
      .post(`/manual-orders/attachOrderTable`, {
        table,
        orderId,
      })
      .then(() => {
        resolve();
        console.log("Table attached Successfully");
      })
      .catch((e) => {
        reject();
        console.log("Table attached error");
        console.log(e.response.data);
        ToastError(
          e.response.data.err ||
            "Some error occoured, while attaching order to table"
        );
      });
  });
