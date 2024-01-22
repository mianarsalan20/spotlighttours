import React, { useState, useEffect, useContext } from "react";
import { Row, Container, Col } from "reactstrap";
import "./admin.css";
import ShowBookingCard from "../../components/ShowBookingCard/ShowBookingCard";
import { AuthContext } from "../../context/AuthContext";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const ShowBookings = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(`${BASE_URL}/bookings`);
  const { user } = useContext(AuthContext);

  const { data: bookings, loading, error } = useFetch(`${status}?page=${page}`);

  const { data: bookingCount } = useFetch(
    `${BASE_URL}/bookings/search/getBookingCount`
  );

  useEffect(() => {
    const pages = Math.ceil(bookingCount / 8); //later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, bookingCount, bookings]);

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
                    setStatus(`${BASE_URL}/bookings`);
                    setPage(0);
                  }}
                >
                  All
                </button>{" "}
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(`${BASE_URL}/bookings/search/getDoneBooking`);
                    setPage(0);
                  }}
                >
                  Done
                </button>{" "}
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(`${BASE_URL}/bookings/search/getPendingBooking`);
                    setPage(0);
                  }}
                >
                  Pending
                </button>{" "}
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setStatus(
                      `${BASE_URL}/bookings/search/getCancelledBooking`
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
                  {bookings?.map((booking) => (
                    <Col lg="6" className="mb-4" key={booking._id}>
                      <ShowBookingCard booking={booking} />
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

export default ShowBookings;
