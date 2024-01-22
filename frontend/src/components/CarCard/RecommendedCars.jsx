import React from "react";
import { Row, Container, Col } from "reactstrap";
import CarCard from "./CarCard";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const RecommendedCars = () => {
  const { data: cars, loading, error } = useFetch(`${BASE_URL}/cars`);
  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-5">
          <h1 className="text-center">Recommended Cars</h1>
        </Col>

        {loading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}

        {!loading &&
          !error &&
          cars?.map(
            (car, index) =>
              index < 4 && (
                <Col lg="3" className="mb-4" key={car._id}>
                  <CarCard car={car} />
                </Col>
              )
          )}
      </Row>
    </Container>
  );
};

export default RecommendedCars;
