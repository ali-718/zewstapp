import { client } from "../client";
import {
  COST_BY_CATEGORY,
  FETCH_FOOD_COUNT,
  FORECASTED_SALES,
  LOSS_IN_KITCHEN,
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
        console.log(e);
      });
  };

export const fetchLossInKitchenAction =
  ({ locationId, interval, startDate, endDate }) =>
  (dispatch) => {
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
      });
  };
