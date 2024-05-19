// src/redux/recipesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Fetch all recipes using the MealDB API
export const fetchAllRecipes = createAsyncThunk('recipes/fetchAllRecipes', async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    favoriteRecipes: [],
    selectedRecipe: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    selectRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriteRecipes.findIndex(r => r.idMeal === recipe.idMeal);
      if (existingIndex !== -1) {
        state.favoriteRecipes = state.favoriteRecipes.filter(r => r.idMeal !== recipe.idMeal);
        toast.success("Removed from favorites");
      } else {
        state.favoriteRecipes.push(recipe);
        toast.success("Added to favorites");
      }
    },
    reorderRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectRecipes = (state) => state.recipeReducer.recipes;
export const selectRecipe = (state) => state.recipeReducer.selectedRecipe;
export const selectStatus = (state) => state.recipeReducer.status;
export const selectError = (state) => state.recipeReducer.error;

export const { selectRecipe: selectRecipeAction, toggleFavorite, reorderRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
