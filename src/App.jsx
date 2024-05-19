import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./pages/Landing";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FavRecipes from "./pages/FavRecipes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/fav",
    element: <FavRecipes />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes}>
        <div>
          <Landing />
        </div>
      </RouterProvider>
    </>
  );
}

export default App;
