import React, { useState } from "react";
import "./showBookingCard.css";
import { Container, Row, Col } from "reactstrap";
import { BASE_URL } from "../../utils/config";

const ShowBookingCard = ({ booking }) => {
  const [changeStatus, setChangeStatus] = useState({
    status: undefined,
  });

  console.log(changeStatus);

  const {
    _id,
    tourName,
    fullName,
    guestSize,
    phone,
    bookAt,
    userEmail,
    status,
  } = booking;
  // date formate
  const options = { year: "numeric", month: "long", day: "numeric" };

  console.log(_id, changeStatus);

  const handleStatus = async (e) => {
    setChangeStatus({ status: e.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(changeStatus),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="show-booking__container">
      <Row className="show-booking__card">
        <Col lg="12">
          <div className="show-booking__info">
            <h2>{tourName}</h2>
            <h3>
              Cutomer Name:{" "}
              {fullName.charAt(0).toUpperCase() + fullName.slice(1)}
            </h3>
            <h3>Cutomer Email: {userEmail}</h3>
            <h3>No of Tickets: {guestSize}</h3>
            <h3>Phone No: {phone}</h3>
            <h3>
              Booked To: {new Date(bookAt).toLocaleDateString("en-US", options)}
            </h3>
            <p>
              Published On{" "}
              {new Date(bookAt).toLocaleDateString("en-US", options)}
            </p>
            {status === "Pending" ? (
              <div>
                Status: <p className="show-booking_btn pending">{status}</p>
              </div>
            ) : status === "Done" ? (
              <div>
                Status: <p className="show-booking_btn done">{status}</p>
              </div>
            ) : status === "Cancelled" ? (
              <div>
                Status: <p className="show-booking_btn cancelled">{status}</p>
              </div>
            ) : null}

            <p>
              Action:{" "}
              <select onChange={handleStatus} className="show-booking_btn">
                <option defaultValue disabled>
                  Select Status
                </option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Cancelled">Cancelled</option>
              </select>{" "}
              <button
                className="show-booking_btn btn btn-dark"
                onClick={handleClick}
              >
                Submit
              </button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ShowBookingCard;
