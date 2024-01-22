import React from "react";
import "./footer.css";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
const quick__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/blogs",
    display: "Blogs",
  },
  {
    path: "/cars",
    display: "Rental_Cars",
  },
];

const quick__links1 = [
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
  {
    path: "/blogs",
    display: "Blogs",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="" />
              <p>
                We are available for Dubai Tourism, and Car Rental Services with
                Drivers in Dubai.
              </p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="tel:+971 58 252 0515" target="_blank">
                    <i className="bx bxs-phone"></i>
                  </Link>
                </span>
                <span>
                  <Link to="mailto:contact@spotlightours.com" target="_blank">
                    <i className="bx bxl-gmail"></i>
                  </Link>
                </span>
                <span>
                  <Link
                    to="https://www.instagram.com/spotlightours/"
                    target="_blank"
                  >
                    <i className="bx bxl-instagram-alt"></i>
                  </Link>
                </span>
                <span>
                  <Link
                    to="https://www.facebook.com/spotlightour"
                    target="_blank"
                  >
                    <i className="bx bxl-facebook"></i>
                  </Link>
                </span>
                <span>
                  <Link
                    to="https://www.tiktok.com/@spotlightour"
                    target="_blank"
                  >
                    <i className="bx bxl-tiktok"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <h5 className=" footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links ">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className=" footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links ">
              {quick__links1.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display} </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className=" footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links ">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">Dubai, UAE</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">contact@spotlightours.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-fill"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+971 58 252 0515</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="12">
            <p className="copyright">
              © {year}, Spotlight Tours. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
