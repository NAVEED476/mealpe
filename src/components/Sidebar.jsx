import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRecipes,
  selectRecipes,
  selectStatus,
  selectError,
  selectRecipe as selectRecipeAction,
  selectSelectedRecipe,
  toggleFavorite as toggleFavoriteAction,
} from "../redux/recipesSlice";
import { useDrag, useDrop } from "react-dnd";

import "../styles/sidebar.css";

export const ItemTypes = {
  RECIPE: 'recipe', 
};

const RecipeItem = ({ recipe, index, moveRecipe }) => {
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    item: { type: ItemTypes.RECIPE, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.RECIPE,
    hover(item, monitor) {
      if (!draggedItem) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveRecipe(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      <div
        className="recipe-item"
        onClick={() => dispatch(selectRecipeAction(recipe))}
      >
        <h4 className="recipe-name">{recipe.strMeal}</h4>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [readmore, setReadmore] = useState(false);
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const selectedRecipe = useSelector(selectSelectedRecipe);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe) => {
    dispatch(selectRecipeAction(recipe));
    setReadmore(false); // Reset readmore state when a new recipe is selected
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleReadmore = () => {
    setReadmore(!readmore);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteAction(selectedRecipe));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moveRecipe = (dragIndex, hoverIndex) => {
    const draggedRecipe = recipes[dragIndex];
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(dragIndex, 1);
    updatedRecipes.splice(hoverIndex, 0, draggedRecipe);
    // Update recipes in Redux store
  };

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
            filteredRecipes.map((recipe, index) => (
              <RecipeItem
                key={recipe.idMeal}
                recipe={recipe}
                index={index}
                moveRecipe={moveRecipe}
              />
            ))
          ) : (
            <p className="loading">Recipes not Found</p>
          )}
        </div>
      </div>
      <div className="right-side-cont">
        {!selectedRecipe ? (
          <h1 className="please-select">please select recipe from left Side</h1>
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
                Add to Favorite
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
