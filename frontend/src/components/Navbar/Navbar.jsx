import React, { useRef, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./navbar.css";

import { AuthContext } from ".././../context/AuthContext";

const nav__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/Cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blogs",
  },
];
const nav__links1 = [
  {
    path: "/addTours",
    display: "AddTours",
  },
  {
    path: "/addBlogs",
    display: "AddBlogs",
  },
  {
    path: "/addCars",
    display: "AddCars",
  },
  {
    path: "/showBookings",
    display: "Tours",
  },
  {
    path: "/showCarBookings",
    display: "Cars",
  },
];

const Navbar = () => {
  const menuRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const Navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
  };

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show__menu");
  };
  return (
    <header className="header sticky_header">
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-3">
                {(user && user.role === "admin" ? nav__links1 : nav__links).map(
                  (item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4 login__btn">
              <div className="nav__btns d-flex align-items-center gap-3">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn ">
                      <Link to="/login">Login</Link>{" "}
                    </Button>
                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Navbar;
