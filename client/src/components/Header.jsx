import React, { useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(isLogin);

  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        dispatch(authActions.logout());
        Swal.fire({
          text: "Logout Successfully",
        });
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary text-lg text-light">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            Blog App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto ">
              {/* two extra button on login */}
              {isLogin && (
                <ul
                  className="login-menu"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/blogs">
                      Blogs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-blogs">
                      My Blogs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-blog">
                      Create Blog
                    </Link>
                  </li>
                </ul>
              )}

              {!isLogin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {isLogin && (
                <li className="nav-item mx-auto">
                  <Link
                    className="nav-link"
                    tp="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
