import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "reactstrap";
import "../AllTours/allTours.css";
import CarCard from "../../components/CarCard/CarCard";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const AllCars = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: cars,
    loading,
    error,
  } = useFetch(`${BASE_URL}/cars?page=${page}`);
  const { data: carCount } = useFetch(`${BASE_URL}/cars/search/getCarCount`);

  useEffect(() => {
    const pages = Math.ceil(carCount / 9); //later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, carCount, cars]);

  return (
    <>
      <section className="all__tours">
        <Container>
          <Row>
            <Col lg="12">
              <h1>All Cars</h1>
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
              {cars?.map((car) => (
                <Col lg="4" className="mb-4" key={car._id}>
                  <CarCard car={car} />
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

export default AllCars;
