import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Game from "./Game";
import NotFound from "./NotFound";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Home />} path="/" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Game />} path="/game/:id" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
