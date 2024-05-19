// src/components/Sidebar.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, selectRecipes, selectStatus, selectError, selectRecipe as selectRecipeAction } from "../redux/recipesSlice";
import "../styles/navbar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe) => {
    dispatch(selectRecipeAction(recipe));
  };

  return (
    <div className="sidebar-cont">
      <div className="search-cont">
        <input
          className="search-box"
          type="text"
          placeholder="search recipe here"
        />
      </div>
      <div className="recipes-list">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-item" onClick={() => handleRecipeClick(recipe)}>
            {recipe.strMeal}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
