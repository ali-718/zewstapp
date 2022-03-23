import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import {
  CREATE_ORDER,
  FETCH_MEALS,
  FETCH_ORDERS,
  FETCH_TABLES,
  UPDATE_MEALS,
  UPDATE_ORDER,
  GET_PAYMENT_INTENT_KEY,
  RESET_SUCCESS,
  FIND_ALL_CUSTOMERS,
} from "./Types";
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

export const fetchAllOrders =
  ({ locationId, isReload = true }) =>
  (dispatch) => {
    dispatch({ type: FETCH_ORDERS.REQUESTED, payload: isReload });

    client
      .get(`manual-orders/allManualOrder/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_ORDERS.SUCCEEDED,
          payload: data,
        });

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
        ToastError("Unable to fetch orders, please try again");
        dispatch({ type: FETCH_ORDERS.FAILED });
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
        console.log(e.response.data);
        ToastError("Unable to fetch tables, please try again later");
        dispatch({ type: FETCH_TABLES.FAILED });
      });
  };

export const createOrder =
  ({
    client_id,
    locationId,
    catalog,
    price,
    discount,
    customerId,
    customer,
    orderType,
  }) =>
  (dispatch) => {
    dispatch({ type: CREATE_ORDER.REQUESTED });

    console.log({
      client_id,
      locationId,
      catalog,
      price,
      discount,
      customerId,
      customer,
      orderType,
    });

    client
      .post(`/manual-orders/addOrder`, {
        client_id,
        locationId,
        catalog,
        timestamp: moment().format("DD-M-yyy"),
        price,
        discount,
        customerId,
        orderType,
        ...(customer && { customer }),
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
        console.log("createorder", e.response.data);
        ToastError(
          e.response.data.err || "Some error occoured, while confirming order"
        );
      });
  };

export const payOrderAction = ({ orderId, locationId, paymentDetails }) =>
  new Promise((resolve, reject) => {
    console.log({ locationId, orderId, paymentDetails });
    client
      .post(`/manual-orders/orderPaid`, {
        locationId,
        orderId,
        paymentDetails,
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

export const orderUpdateAction =
  ({ locationId, orderId, isLoading = true }) =>
  (dispatch) => {
    console.log({ locationId, orderId });
    dispatch({
      type: UPDATE_ORDER.REQUESTED,
      payload: { orderId, isLoading, isDone: true },
    });

    client
      .post(`manual-orders/updateOrder`, {
        locationId,
        orderId,
        stature: "DONE",
      })
      .then(({ data }) => {
        dispatch({
          type: UPDATE_ORDER.SUCCEEDED,
          payload: orderId,
        });
        dispatch(fetchAllOrders({ locationId, isReload: false }));
        ToastSuccess("Order served successfully");
      })
      .catch((e) => {
        console.log("order update action", e.response.data);
        ToastError(
          e.response.data.err || "Unable to complete order, please try again"
        );
        dispatch({ type: UPDATE_ORDER.FAILED });
      });
  };

export const orderMarkServedAction =
  ({ locationId, orderId, ticketNo, meals }) =>
  (dispatch) => {
    console.log({ locationId, orderId, ticketNo, meals });
    dispatch({
      type: UPDATE_ORDER.REQUESTED,
      payload: { orderId, isLoading: true },
    });

    client
      .post(`manual-orders/markServed`, {
        locationId,
        orderId,
        ticketNo,
        meals,
      })
      .then(() => {
        ToastSuccess("Meals served successfully");
        dispatch(fetchAllOrders({ locationId, isReload: false }));
        dispatch({
          type: UPDATE_MEALS.SUCCEEDED,
          payload: { orderId, meals },
        });
      })
      .catch((e) => {
        console.log("orderMarkServedAction", e);
        ToastError(
          e?.response?.data?.err || "Unable to complete order, please try again"
        );
        dispatch({ type: UPDATE_ORDER.FAILED });
      });
  };

export const getOrderPaymentIntentAction =
  ({ amount, clientId }) =>
  (dispatch) => {
    dispatch({
      type: GET_PAYMENT_INTENT_KEY.REQUESTED,
    });

    client
      .post(`/manual-orders/order-payment`, {
        amount,
        clientId,
      })
      .then((res) => {
        dispatch({
          type: GET_PAYMENT_INTENT_KEY.SUCCEEDED,
          payload: res.data,
        });
      })
      .catch((e) => {
        dispatch({ type: GET_PAYMENT_INTENT_KEY.FAILED });
        console.log("getOrderPaymentIntentAction", e.response.data);
        ToastError(
          e.response.data.err || "Some error occoured, while confirming order"
        );
      });
  };

export const clearOrderPaymentIntentAction = () => (dispatch) => {
  dispatch({ type: GET_PAYMENT_INTENT_KEY.FAILED });
};

export const fetchOrderByTableId = ({ locationId, tableId }) =>
  new Promise((resolve, reject) => {
    console.log({ locationId, tableId });
    client
      .get(`/manual-orders/getOrderByTable/${locationId}/${tableId}`)
      .then(({ data }) => {
        console.log(data);
        resolve(data?.order);
      })
      .catch((e) => {
        reject();
        console.log("fetchOrderByTableId", e?.response?.data);
        ToastError(
          e?.response?.data?.err ||
            "Some error occoured, while confirming order"
        );
      });
  });

export const updateExistingOrderAction =
  ({ locationId, orderId, catalog, price }) =>
  (dispatch) => {
    dispatch({ type: CREATE_ORDER.REQUESTED });

    console.log({ locationId, orderId, catalog, price });

    client
      .post("manual-orders/updateExistingOrder", {
        locationId,
        orderId,
        catalog,
        price,
      })
      .then((res) => {
        dispatch({
          type: CREATE_ORDER.SUCCEEDED,
          payload: orderId,
        });
        console.log(res.data);
      })
      .catch((e) => {
        dispatch({ type: CREATE_ORDER.FAILED });
        console.log("updateExistingOrderAction", e?.response?.data);
        ToastError(
          e.response.data.err || "Some error occoured, while confirming order"
        );
      });
  };

export const resetOrderState = () => (dispatch) =>
  dispatch({ type: RESET_SUCCESS });

export const findAllCustomers =
  ({ locationId }) =>
  (dispatch) => {
    dispatch({ type: FIND_ALL_CUSTOMERS.REQUESTED });

    client
      .get(
        `/manual-orders/findAllCustomers/${locationId}`
      )
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: FIND_ALL_CUSTOMERS.SUCCEEDED, payload: data?.Items });
      });
  };

export const createCustomer = ({
  locationId,
  firstName,
  lastName,
  phone,
  email,
  address,
  countryCode,
  country,
}) =>
  new Promise((resolve, reject) => {
    client
      .post(`/manual-orders/addCustomer`, {
        locationId,
        firstName,
        lastName,
        phone,
        email,
        address,
        countryCode,
        country,
      })
      .then(({ data }) => {
        resolve();
      })
      .catch((e) => {
        console.log(   e.response.data)
      reject()
        ToastError(
          e.response.data.err || "Some error occoured, please try again later"
        );
      });
  });
