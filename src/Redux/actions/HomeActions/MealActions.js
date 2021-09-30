import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import {
  ADD_MEAL,
  ADD_NEW_LOCATION,
  DELETE_MEAL,
  GET_ADDONS,
  GET_ALLERGENS,
  GET_CATEGORIES,
  GET_HOTEL_LOCATIONS,
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
        dispatch(getAllMeals({ id: locationId }));

        navigation.pop(2);
      })
      .catch((e) => {
        dispatch({ type: DELETE_MEAL.FAILED });
        ToastError("Some error occoured! please try again later");
      });
  };

export const getAllLocations =
  ({ userId }) =>
  (dispatch) => {
    dispatch({ type: GET_HOTEL_LOCATIONS.REQUESTED });
    client
      .get(`/location/findAll/${userId}`)
      .then((data) => {
        const locations = data.data.locations.Items;
        const arr = [];
        locations.map((item) => {
          arr.push({
            ...item,
            meal: {
              isLoading: false,
              isError: false,
              meals: [],
            },
          });
        });

        dispatch({
          type: GET_HOTEL_LOCATIONS.SUCCEEDED,
          payload: {
            locations: arr,
          },
        });
      })
      .catch((e) => {
        dispatch({ type: GET_HOTEL_LOCATIONS.FAILED });
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
        dispatch(getAllMeals({ id: locationId }));

        ToastSuccess("Sucess", "Meal has been added successfully");
        navigation.goBack();
      })
      .catch((e) => {
        dispatch({ type: ADD_MEAL.FAILED });
        ToastError("Some error occoured! please try again later");
      });
  };

export const AddNewLocation =
  ({
    clientId,
    locationName,
    contact_no,
    email,
    address,
    cordinates = "",
    manager = "",
    timmings = "",
    default_location = false,
    navigation,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_NEW_LOCATION.REQUESTED });

    client
      .post(`/location/add`, {
        clientId,
        locationName,
        contact_no: `+${contact_no}`,
        email,
        address,
        cordinates,
        manager,
        timmings,
        default_location,
      })
      .then((data) => {
        dispatch({
          type: ADD_NEW_LOCATION.SUCCEEDED,
        });
        dispatch(getAllLocations({ userId: clientId }));
        navigation.goBack();
      })
      .catch((e) => {
        dispatch({ type: ADD_NEW_LOCATION.FAILED });
      });
  };
