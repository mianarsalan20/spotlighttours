import React from "react";
import { Row, Container, Col } from "reactstrap";
import TourCard from "./TourCard";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
const FeaturedTour = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`);
  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-5">
          <h1 className="text-center">Featured Tours</h1>
        </Col>

        {loading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}

        {!loading &&
          !error &&
          featuredTours?.map((tour) => (
            <Col lg="3" className="mb-4" key={tour._id}>
              <TourCard tour={tour} checkFeatured={true} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default FeaturedTour;
