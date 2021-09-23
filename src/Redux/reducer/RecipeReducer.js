import produce from "immer";

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
      default:
        return state;
    }
    return state;
  }
);
