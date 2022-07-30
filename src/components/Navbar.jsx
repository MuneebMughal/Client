import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authConstants } from "../actions/constants";
const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: authConstants.LOGOUT,
    });
    localStorage.clear();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='/'>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/packages">
                Packages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/map">
                Map
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/warnings">
                Warnings
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 end">
          <li className="nav-item">
            <Link className="nav-link active" to="/" onClick={logout}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
