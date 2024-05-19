import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRecipes,
  selectRecipes,
  selectStatus,
  selectError,
  selectRecipe as selectRecipeAction,
  selectSelectedRecipe,
  toggleFavorite,
} from "../redux/recipesSlice";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [readmore, setReadmore] = useState(false);
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const selectedRecipe = useSelector(selectSelectedRecipe);
  const favoriteRecipes = useSelector((state) => state.recipeReducer.favoriteRecipes);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleRecipeClick = useCallback(
    (recipe) => {
      dispatch(selectRecipeAction(recipe));
      setReadmore(false); 
    },
    [dispatch]
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleReadmore = () => {
    setReadmore(!readmore);
  };

  const handleToggleFavorite = () => {
    if (selectedRecipe) {
      dispatch(toggleFavorite(selectedRecipe)); 
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFavorite = selectedRecipe && favoriteRecipes.some((recipe) => recipe.idMeal === selectedRecipe.idMeal);

  return (
    <div className="sidebar-cont">
      <div className="left-sidebar-cont">
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
          {status === "succeeded" && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="recipe-item"
                onClick={() => handleRecipeClick(recipe)}
              >
                <h4 className="recipe-name">{recipe.strMeal}</h4>
              </div>
            ))
          ) : (
            <p className="loading">Recipes not Found</p>
          )}
        </div>
      </div>
      <div className="right-side-cont">
        {!selectedRecipe ? (
          <h1 className="please-select">Please select a recipe from the left side</h1>
        ) : (
          <div className="selected-recipe">
            <div>
              <h2 className="dishname">{selectedRecipe.strMeal}</h2>
              <img
                className="recipe-img"
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
              />
            </div>
            <div className="readmore-cont">
              {selectedRecipe.strInstructions && (
                <p className="readmore-text">
                  {readmore
                    ? selectedRecipe.strInstructions
                    : `${selectedRecipe.strInstructions.slice(0, 200)}...`}{" "}
                  <span className="read" onClick={handleToggleReadmore}>
                    {readmore ? "Read less" : "Read more"}
                  </span>
                </p>
              )}
              <button className="add-to-fav-btn" onClick={handleToggleFavorite}>
                {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
