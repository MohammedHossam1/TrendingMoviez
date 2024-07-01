import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar   navbar-expand-lg navbar-light bg-light text-center ">
      <div className="container-fluid d-flex justify-content-center   text-center d-flex justify-content-center ">
        <Link className="navbar-brand" to="">
          Trending Movies 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" to="/">
              Home
            </NavLink>
            <NavLink className="nav-item nav-link" to="about">
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
