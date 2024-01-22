import React, { useState, useContext, useEffect } from "react";
import "../Booking/booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const CarBooking = ({ car, avgRating }) => {
  const { price, reviews, title } = car;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  let currentDate = new Date().toJSON().slice(0, 10);

  const [bookingInfo, setBookingInfo] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    carName: title,
    fullName: "",
    guestSize: "",
    phone: "",
    bookFrom: "",
    bookTo: "",
  });
  const handleChange = (e) => {
    setBookingInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  /*const serviceFee = 0;
  const diffInMs =
    new Date(bookingInfo.bookTo) - new Date(bookingInfo.bookFrom);
  console.log(bookingInfo.bookTo);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  console.log(diffInDays);
  const totalAmount = Number(price) * Number(diffInDays) + Number(serviceFee);*/

  //send booking info to the server
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(bookingInfo);

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please login to book a tour");
      } else {
        const res = await fetch(`${BASE_URL}/carBookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bookingInfo),
        });

        const result = await res.json();
        if (!res.ok) {
          alert(result.message);
        }
        if (res.ok) {
          navigate("/tourBooked");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span>/per day</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length} reviews)
        </span>
      </div>
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={submitHandler}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <span style={{ color: "#6e7074" }}>Pick-up Date</span>
            <input
              type="datetime-local"
              placeholder=""
              id="bookFrom"
              min={currentDate}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <span style={{ color: "#6e7074" }}>Drop-off Date</span>
            <input
              type="datetime-local"
              placeholder=""
              id="bookTo"
              min={currentDate}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <div className="booking__bottom">
            <ListGroup>
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items -center gap-1">
                  ${price} <i class="ri-close-line"></i> per day
                </h5>
                <span> ${price} </span>
              </ListGroupItem>
            </ListGroup>
            <Button type="submit" className="btn primary_btn w-100 mt-4">
              Book Now
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CarBooking;
