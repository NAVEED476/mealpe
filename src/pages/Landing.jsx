import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./landing.css";

const Landing = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="main-sidebar-cont">
        <Sidebar/>
      </div>
    </div>
  );
};

export default Landing;
