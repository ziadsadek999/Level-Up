import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <select name="User">
            <option value="/trainee">Trainee</option>
            <option value="/coorporateTrainee">Coorporate Trainee</option>
            <option value="/instructor">Instructor</option>
            <option value="/admin">Admin</option>
          </select>
        </li>
        <li>
          <Link to="/">Explore</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
