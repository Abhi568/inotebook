import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginIN from "./Login.js";
import noteContext from "../context/notes/noteContext.js";
import { useContext, useState } from "react";
import SignUp from "./SignUp.js";
import userLoggedIn from "./../Image/userLoggedWhite.png";
import "./Navbar.css";
import { useEffect } from "react";
import logoutIcon from "./../Image/signout.png";

export default function Navbar() {
  let location = useLocation();
  let [userDetails, setUserDetails] = useState({});
  let { auth_Token, settingAuthToken } = useContext(noteContext);

  useEffect(() => {
    if (auth_Token !== "") {
      fetchUserDetails();
    }
    // eslint-disable-next-line
  }, [auth_Token]);

  const fetchUserDetails = () => {
    fetch("http://localhost:5000/api/auth/fetchuser", {
      method: "POST",
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token")).authToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => console.log(err));
  };
  const logout = () => {
    localStorage.clear();
    settingAuthToken();
    setUserDetails({});
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-primary fw-bold" href="/">
            iNoteBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button
                style={{ display: auth_Token.length > 0 ? "none" : "block" }}
                className="btn btn-primary me-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#login"
                aria-controls="login"
              >
                Login
              </button>
              <button
                style={{ display: auth_Token.length > 0 ? "none" : "block" }}
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#signup"
                aria-controls="signup"
              >
                Signup
              </button>
            </div>
            
            {auth_Token && (
              <div className="dropdown mr-3">
                <span
                  className="dropdown-toggle"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={userLoggedIn}
                    alt="userPhoto"
                    className="imageColor"
                  />
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <span>{userDetails.name}</span>
                  </li>
                  <hr />
                  <li>
                    <span onClick={logout}>
                      <img src={logoutIcon} alt="logout" />
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            )}
            {/* </div> */}
          </div>
        </div>
      </nav>
      <LoginIN></LoginIN>
      <SignUp />
    </>
  );
}
