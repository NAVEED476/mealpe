import React from "react";
import "../styles/navbar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-cont">
      <div className="search-cont">
        <input
          className="search-box"
          type="text"
          placeholder="search recipe here"
        />
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
