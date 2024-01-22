import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "reactstrap";
import "./allTours.css";
import TourCard from "../../components/FeaturedTour/TourCard";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const AllTours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 9); //later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <section className="all__tours">
        <Container>
          <Row>
            <Col lg="12">
              <h1>All Tours</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          {loading && <h1>Loading...</h1>}
          {error && <h1>{error}</h1>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="4" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} checkFeatured={false} />
                </Col>
              ))}
              <Col lg="12 ">
                <div
                  className="pagination d-flex align-items-center
                justify-content-center mt-4 gap-3"
                >
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default AllTours;
