import React from "react";
import "../styles/navbar.css";
import { MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavoriteRecipes } from "../redux/recipesSlice";

const Navbar = () => {
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const favoriteCount = favoriteRecipes.length;

  return (
    <div className="nav-cont">
      <div className="left-img">
        <img
          className="img-style"
          src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
          alt=""
        />
      </div>
      <div>
        <div className="fav-items-cont">
          <Link to="/fav" className="fav-link">
            <MdOutlineFavorite />
            {favoriteCount > 0 && (
              <span className="fav-count">{favoriteCount}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
