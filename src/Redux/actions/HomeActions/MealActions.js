import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import {
  ADD_MEAL,
  DELETE_MEAL,
  GET_ADDONS,
  GET_ALLERGENS,
  GET_CATEGORIES,
  GET_MEALS,
} from "./Types";

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

export const getAllMeals =
  ({ id }) =>
  (dispatch) => {
    dispatch({ type: GET_MEALS.REQUESTED, payload: { id } });

    client
      .get(`/meal/manual/findAll/${id}`)
      .then((data) => {
        dispatch({
          type: GET_MEALS.SUCCEEDED,
          payload: { meals: data.data?.meals?.Items, id },
        });
      })
      .catch((e) => {
        dispatch({ type: GET_MEALS.FAILED, payload: { id } });
      });
  };

export const deleteSpecificMeal =
  ({ locationId, mealId, navigation }) =>
  (dispatch) => {
    dispatch({ type: DELETE_MEAL.REQUESTED });

    client
      .post(`/meal/manual/delete`, {
        locationId,
        mealId,
      })
      .then((data) => {
        dispatch({
          type: DELETE_MEAL.SUCCEEDED,
          payload: { mealId, locationId },
        });
        navigation.pop(2);
      })
      .catch((e) => {
        dispatch({ type: DELETE_MEAL.FAILED });
        ToastError("Some error occoured! please try again later");
      });
  };

export const addNewMeal =
  ({
    locationId,
    mealName,
    mealDescription,
    mealPrice,
    mealCurrency = "$",
    mealAvailability,
    mealDaysAvailable,
    mealCategory,
    mealAllergens,
    mealAddons,
    mealDiscount = "",
    mealMedia,
    navigation,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_MEAL.REQUESTED });

    client
      .post(`/meal/manual/add`, {
        locationId,
        mealName,
        mealDescription,
        mealPrice,
        mealCurrency,
        mealAvailability,
        mealDaysAvailable,
        mealCategory,
        mealAllergens,
        mealAddons,
        mealDiscount,
        mealMedia: [`data:image/jpeg;base64,${mealMedia}`],
      })
      .then((data) => {
        dispatch({
          type: ADD_MEAL.SUCCEEDED,
        });

        ToastSuccess("Sucess", "Meal has been added successfully");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e.response);
        dispatch({ type: ADD_MEAL.FAILED });
        ToastError("Some error occoured! please try again later");
      });
  };
