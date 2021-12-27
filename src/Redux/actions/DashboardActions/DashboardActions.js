import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import {
  COST_BY_CATEGORY,
  DAILY_FOOD_LOG_ADD,
  FETCH_FOOD_COUNT,
  FORECASTED_SALES,
  LOSS_IN_KITCHEN,
  PRICE_FLUCTATION,
} from "./Types";

export const fetchFoodCountAction =
  ({ locationId, interval, startDate, endDate }) =>
  (dispatch) => {
    dispatch({ type: FETCH_FOOD_COUNT.REQUESTED });
    client
      .get(
        `/dashboard/item/counts/${locationId}?interval=${interval}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((data) => {
        dispatch({
          type: FETCH_FOOD_COUNT.SUCCEEDED,
          payload: data.data,
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_FOOD_COUNT.FAILED });
        console.log(e.response.data);
      });
  };

export const fetchLossInKitchenAction =
  ({ locationId, interval, startDate, endDate, isError = false }) =>
  (dispatch) => {
    console.log({ locationId, interval, startDate, endDate, isError });
    dispatch({ type: LOSS_IN_KITCHEN.REQUESTED });
    client
      .get(
        `/dashboard/lossInKitchen/${locationId}?interval=${interval}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((data) => {
        dispatch({
          type: LOSS_IN_KITCHEN.SUCCEEDED,
          payload: data.data,
        });
      })
      .catch((e) => {
        dispatch({ type: LOSS_IN_KITCHEN.FAILED });
        console.log(e.response.data);

        if (isError) {
          ToastError(
            e.response.data.message ||
              "Some error occoured, please try again later"
          );
        }
      });
  };

export const fetchCostByCategoryAction =
  ({ locationId, interval, startDate, endDate }) =>
  (dispatch) => {
    dispatch({ type: COST_BY_CATEGORY.REQUESTED });
    client
      .get(
        `/dashboard/costByCategory/${locationId}?interval=${interval}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((data) => {
        dispatch({
          type: COST_BY_CATEGORY.SUCCEEDED,
          payload: data.data,
        });
      })
      .catch((e) => {
        dispatch({ type: COST_BY_CATEGORY.FAILED });
        console.log(e.response.data);
      });
  };

export const fetchPriceFluctuationAction =
  ({ locationId, interval, month }) =>
  (dispatch) => {
    dispatch({ type: PRICE_FLUCTATION.REQUESTED });
    client
      .get(
        `/dashboard/priceFluctuation/${locationId}?month=${month}&interval=${interval}`
      )
      .then((data) => {
        dispatch({
          type: PRICE_FLUCTATION.SUCCEEDED,
          payload: data.data?.fluctuationData,
        });
      })
      .catch((e) => {
        dispatch({ type: PRICE_FLUCTATION.FAILED });
        console.log(e.response.data);
      });
  };

export const fetchForecastedSalesAction =
  ({ locationId, interval, startDate, endDate }) =>
  (dispatch) => {
    dispatch({ type: FORECASTED_SALES.REQUESTED });
    client
      .get(
        `/dashboard/orders/revenue/${locationId}?interval=${interval}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((data) => {
        dispatch({
          type: FORECASTED_SALES.SUCCEEDED,
          payload: data.data,
        });
      })
      .catch((e) => {
        dispatch({ type: FORECASTED_SALES.FAILED });
        console.log(e.response.data);
      });
  };

export const dailyFoodLogAddAction = ({
  item,
  reason,
  wastedQuantity,
  costPerUnit,
}) =>
  new Promise((resolve, reject) => {
    console.log({ item, reason, wastedQuantity, costPerUnit });
    client
      .post(`wastelogs/add`, { item, reason, wastedQuantity, costPerUnit })
      .then((data) => {
        resolve();
        ToastSuccess("Success", "Food added successfully");
      })
      .catch((e) => {
        console.log(e.response.data);
        reject();
        ToastError(
          e.response.data?.message ||
            "Some error occoured, please try again later"
        );
      });
  });
