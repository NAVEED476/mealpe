
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRecipes,
  selectRecipes,
  selectStatus,
  selectError,
  selectRecipe as selectRecipeAction,
} from "../redux/recipesSlice";
import "../styles/navbar.css";
import "../styles/sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe) => {
    dispatch(selectRecipeAction(recipe));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar-cont">
      <div className="search-cont">
        <input
          className="search-box"
          type="text"
          placeholder="search recipe here"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="recipes-list">
        {status === "loading" && <p className="loading">Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          filteredRecipes.length > 0 ? filteredRecipes .map((recipe) => (
            <div
              key={recipe.idMeal}
              className="recipe-item"
              onClick={() => handleRecipeClick(recipe)}
            >
              <h4 className="recipe-name">{recipe.strMeal}</h4>
            </div>
          )):<p className="loading">Recipies not Found</p>}
      </div>
    </div>
  );
};

export default Sidebar;
