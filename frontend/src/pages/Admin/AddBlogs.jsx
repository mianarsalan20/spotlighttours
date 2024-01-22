import React, { useState, useContext } from "react";
import "./admin.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlogs = () => {
  const [blogInfo, setBlogInfo] = useState({
    title: undefined,
    desc: undefined,
    photo: undefined,
  });
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setBlogInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  //console.log(blogInfo);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(blogInfo),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      Navigate("/blogAdded");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          {user && user.role === "admin" ? (
            <Col lg="6" className="m-auto">
              <div className="admin__container d-flex justify-content-between">
                <div className="admin__form">
                  <h2>Add New Blog</h2>
                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Photo Link"
                        required
                        id="photo"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ReactQuill
                        style={{ backgroundColor: "white" }}
                        placeholder="Write Something..."
                        id="desc"
                        onChange={(e) => {
                          setBlogInfo((prev) => ({ ...prev, desc: e }));
                        }}
                      />
                    </FormGroup>

                    <Button
                      className="btn secondary_btn auth__btn"
                      type="submit"
                    >
                      Add New Blog
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          ) : (
            <h1>"Not Authorized"</h1>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default AddBlogs;
