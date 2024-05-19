import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../redux/recipesSlice"


export const store = configureStore({

    reducer:{
        recipeReducer : recipeReducer
    }
})