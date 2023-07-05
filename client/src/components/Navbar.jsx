import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="mb-4">
      <ul className="flex">
        <li className="mr-4">
          <Link to="/">Home</Link>
        </li>
        <li className="mr-4">
          <Link to="/create-ticket">Create Ticket</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
