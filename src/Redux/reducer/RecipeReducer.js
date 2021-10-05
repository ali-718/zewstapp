import produce from "immer";
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  FETCH_RECIPE,
} from "../actions/RecipeActions/Types";

const initialState = {
  recipe: {
    isLoading: false,
    isError: false,
    list: [],
  },
  addRecipe: {
    isLoading: false,
    isError: false,
  },
  deleteRecipe: {
    isLoading: false,
    isError: false,
  },
};

export const recipeReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case DELETE_RECIPE.REQUESTED: {
        state.deleteRecipe.isLoading = true;
        state.deleteRecipe.isError = false;
        break;
      }
      case DELETE_RECIPE.SUCCEEDED: {
        state.deleteRecipe.isLoading = false;
        state.deleteRecipe.isError = false;

        break;
      }
      case DELETE_RECIPE.FAILED: {
        state.deleteRecipe.isLoading = false;
        state.deleteRecipe.isError = true;
        break;
      }
      case FETCH_RECIPE.REQUESTED: {
        state.recipe.isLoading = true;
        state.recipe.isError = false;
        break;
      }
      case FETCH_RECIPE.SUCCEEDED: {
        state.recipe.isLoading = false;
        state.recipe.isError = false;
        state.recipe.list = payload;
        break;
      }
      case FETCH_RECIPE.FAILED: {
        state.recipe.isLoading = false;
        state.recipe.isError = true;
        state.recipe.list = [];
        break;
      }
      case EDIT_RECIPE.REQUESTED: {
        state.addRecipe.isLoading = true;
        state.addRecipe.isError = false;
        break;
      }
      case EDIT_RECIPE.SUCCEEDED: {
        state.addRecipe.isLoading = false;
        state.addRecipe.isError = false;
        break;
      }
      case EDIT_RECIPE.FAILED: {
        state.addRecipe.isLoading = false;
        state.addRecipe.isError = true;
        break;
      }
      case ADD_RECIPE.REQUESTED: {
        state.addRecipe.isLoading = true;
        state.addRecipe.isError = false;
        break;
      }
      case ADD_RECIPE.SUCCEEDED: {
        state.addRecipe.isLoading = false;
        state.addRecipe.isError = false;
        break;
      }
      case ADD_RECIPE.FAILED: {
        state.addRecipe.isLoading = false;
        state.addRecipe.isError = true;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
