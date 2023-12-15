import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      404 page
      <Link to="/">return to home</Link>
    </div>
  );
};

export default NotFound;
