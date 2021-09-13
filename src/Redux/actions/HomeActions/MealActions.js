import { client } from "../client";
import { GET_ADDONS, GET_ALLERGENS, GET_CATEGORIES } from "./Types";

export const getMealCategories = () => (dispatch) =>
  new Promise((resolve, reject) => {
    client
      .get("/meal/manual/getCategories")
      .then((data) => {
        resolve(data.data);
        dispatch({ type: GET_CATEGORIES, payload: data.data?.categories });
      })
      .catch((e) => reject(e.response.data));
  });

export const getMealAllergens = () => (dispatch) =>
  new Promise((resolve, reject) => {
    client
      .get("/meal/manual/getAllergens")
      .then((data) => {
        resolve(data.data);
        dispatch({ type: GET_ALLERGENS, payload: data.data?.allergens });
      })
      .catch((e) => reject(e.response.data));
  });

export const getMealAddons = () => (dispatch) =>
  new Promise((resolve, reject) => {
    client
      .get("/meal/manual/getAddons")
      .then((data) => {
        resolve(data.data);
        dispatch({ type: GET_ADDONS, payload: data.data?.addons });
      })
      .catch((e) => reject(e.response.data));
  });
