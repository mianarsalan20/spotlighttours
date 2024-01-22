import React, { useState, useEffect, useContext } from "react";
import { Row, Container, Col } from "reactstrap";
import "./admin.css";
import ShowCarBookingCard from "../../components/ShowCarBookingCard/ShowCarBookingCard";
import { AuthContext } from "../../context/AuthContext";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const ShowCarBookings = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(`${BASE_URL}/carBookings`);
  const { user } = useContext(AuthContext);

  const { data: cars, loading, error } = useFetch(`${status}?page=${page}`);

  const { data: bookingCount } = useFetch(
    `${BASE_URL}/carBookings/search/getBookingCount`
  );

  useEffect(() => {
    const pages = Math.ceil(bookingCount / 8); //later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, bookingCount, cars]);

  return (
    <>
      {user && user.role === "admin" ? (
        <>
          <section className="booking__hero">
            <Container>
              <Row>
                <Col lg="12">
                  <h1>Bookings</h1>
                  <h3>Our latest bookings</h3>
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container className="booking__contanier">
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(`${BASE_URL}/carBookings`);
                    setPage(0);
                  }}
                >
                  All
                </button>{" "}
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(`${BASE_URL}/carBookings/search/getDoneBooking`);
                    setPage(0);
                  }}
                >
                  Done
                </button>{" "}
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(
                      `${BASE_URL}/carBookings/search/getPendingBooking`
                    );
                    setPage(0);
                  }}
                >
                  Pending
                </button>{" "}
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(
                      `${BASE_URL}/carBookings/search/getCancelledBooking`
                    );
                    setPage(0);
                  }}
                >
                  Cancelled
                </button>{" "}
              </div>
              {loading && <h1>Loading...</h1>}
              {error && <h1>{error}</h1>}
              {!loading && !error && (
                <Row>
                  {cars?.map((car) => (
                    <Col lg="6" className="mb-4" key={car._id}>
                      <ShowCarBookingCard car={car} />
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
      ) : (
        <h1>Not Authorized</h1>
      )}
    </>
  );
};

export default ShowCarBookings;
