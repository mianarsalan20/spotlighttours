import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const TourAdded = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                {" "}
                <i
                  className="ri-checkbox-circle-line"
                  style={{ fontSize: "4rem", color: "green" }}
                ></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">Your Tour is Added</h3>
              <Button className="btn primary_btn w-25">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourAdded;
