import React, { useState, useContext } from "react";
import "./admin.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddCars = () => {
  const [carInfo, setCarInfo] = useState({
    title: undefined,
    price: undefined,
    desc: undefined,
    reviews: [],
    photo: undefined,
    seats: undefined,
    modelYear: undefined,
    gearBox: undefined,
  });
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setCarInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  //console.log(tourInfo);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(carInfo),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      Navigate("/tourAdded");
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
                  <h2>Add New Car</h2>

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
                        type="number"
                        placeholder="Seats"
                        required
                        id="seats"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        id="price"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="number"
                        placeholder="Car Model Year"
                        required
                        id="modelYear"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="GearBox: Automatic/Manual/Triptronic"
                        required
                        id="gearbox"
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
                          setCarInfo((prev) => ({ ...prev, desc: e }));
                        }}
                      />
                    </FormGroup>
                    <Button
                      className="btn secondary_btn auth__btn"
                      type="submit"
                    >
                      Add New Car
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

export default AddCars;
