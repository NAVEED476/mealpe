import React from 'react'
import "../styles/navbar.css";
import { MdOutlineFavorite } from "react-icons/md";
const Navbar = () => {
  return (
    <div className='nav-cont'>
        <div className='left-img'>
            <img className='img-style' src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" alt="" />
        </div>
        <div>
        <div className='fav-items-cont'>
     
        <MdOutlineFavorite />
      </div>
        </div>
    </div>
  )
}

export default Navbar