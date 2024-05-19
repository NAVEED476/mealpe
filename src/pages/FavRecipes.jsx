import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteRecipes, removeFavorite } from "../redux/recipesSlice"; 
import "../styles/favRecipes.css"; 
import { Link } from "react-router-dom";

const FavRecipes = () => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const handleRemoveFavorite = (recipe) => {
    dispatch(removeFavorite(recipe));
  };

  return (
    <div className="fav-recipes-cont">
      <Link to="/">
        <p>Recipes</p>
      </Link>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="fav-recipes-list">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="fav-recipe-item">
              <h4>{recipe.strMeal}</h4>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="fav-recipe-img"
              />
              <button
                className="remove-fav-btn"
                onClick={() => handleRemoveFavorite(recipe)}
              >
                Remove from Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavRecipes;
