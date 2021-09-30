import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import { ADD_RECIPE, FETCH_RECIPE } from "./Types";

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
