import { client } from "../client";
import { FETCH_FOOD_COUNT } from "./Types";

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
