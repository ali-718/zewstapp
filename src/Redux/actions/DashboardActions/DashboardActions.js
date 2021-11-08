import { client } from "../client";
import { FETCH_FOOD_COUNT, LOSS_IN_KITCHEN } from "./Types";

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
      });
  };
