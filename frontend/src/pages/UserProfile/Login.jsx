import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user.png";

import { AuthContext } from "../.././context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: undefined,
    password: undefined,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { dispatch } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      console.log(result.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result.data,
      });
      Navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary_btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account?<Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
