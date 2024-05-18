import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Landing = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Sidebar/>
      </div>
    </div>
  );
};

export default Landing;
