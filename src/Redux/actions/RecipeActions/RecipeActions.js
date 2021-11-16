import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import {
  ADD_RECIPE,
  ALL_LOCATION,
  DELETE_RECIPE,
  EDIT_RECIPE,
  FETCH_RECIPE,
} from "./Types";

export const fetchRecipeCategoryActions = () =>
  new Promise((resolve, reject) => {
    client
      .get("/recipe/getCategories")
      .then((data) => {
        resolve(data.data?.categories);
      })
      .catch((e) => reject(e.response.data));
  });

export const fetchRecipeActions =
  ({ clientId }) =>
  (dispatch) => {
    dispatch({ type: FETCH_RECIPE.REQUESTED });
    client
      .get(`/recipe/findAll/${clientId}`)
      .then((res) => {
        dispatch({
          type: FETCH_RECIPE.SUCCEEDED,
          payload: res.data.meals.Items,
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_RECIPE.FAILED });
      });
  };

export const addRecipeAction =
  ({
    clientId,
    locationId,
    recipeTitle,
    macroIngredient,
    serving,
    recipeType,
    cookingTime,
    ingredients,
    recipeSteps,
    navigation,
    category,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_RECIPE.REQUESTED });
    client
      .post("/recipe/add", {
        clientId,
        locationId,
        recipeTitle,
        macroIngredient,
        serving,
        recipeType,
        cookingTime,
        ingredients,
        recipeSteps,
        available: true,
        category,
      })
      .then((res) => {
        ToastSuccess("Recipe added successfully");
        dispatch({ type: ADD_RECIPE.SUCCEEDED });
        dispatch(fetchRecipeActions({ clientId }));
        navigation.goBack();
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: ADD_RECIPE.FAILED });
      });
  };

export const updateRecipeAction =
  ({
    clientId,
    locationId,
    recipeTitle,
    macroIngredient,
    serving,
    recipeType,
    cookingTime,
    ingredients,
    recipeSteps,
    navigation,
    catalogId,
    category,
  }) =>
  (dispatch) => {
    dispatch({ type: EDIT_RECIPE.REQUESTED });
    client
      .post("/recipe/update", {
        clientId,
        locationId,
        recipeTitle,
        macroIngredient,
        serving,
        recipeType,
        cookingTime,
        ingredients,
        recipeSteps,
        available: true,
        catalogId,
        category,
      })
      .then((res) => {
        ToastSuccess("Recipe updated successfully");
        dispatch({ type: EDIT_RECIPE.SUCCEEDED, payload: catalogId });
        dispatch(fetchRecipeActions({ clientId }));
        navigation.pop(2);
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: EDIT_RECIPE.FAILED });
      });
  };

export const deleteRecipeAction =
  ({ catalogId, locationId, clientId, navigation }) =>
  (dispatch) => {
    dispatch({ type: DELETE_RECIPE.REQUESTED });
    client
      .post(`/recipe/delete/${locationId}/${catalogId}`)
      .then((res) => {
        ToastSuccess("Recipe deleted successfully");
        dispatch({
          type: DELETE_RECIPE.SUCCEEDED,
        });
        dispatch(fetchRecipeActions({ clientId }));
        navigation.navigate("Recipe");
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: DELETE_RECIPE.FAILED });
      });
  };
