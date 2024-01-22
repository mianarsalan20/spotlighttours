import React, { useRef, useState, useEffect, useContext } from "react";
import "./tourDetails.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import Booking from "../../components/Booking/Booking";
import avatar from "../../assets/images/avatar.jpg";
import ReactStars from "react-rating-stars-component";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";
import { AuthContext } from "../../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [reviewRating, setReviewReting] = useState(5);
  const { user } = useContext(AuthContext);

  //this is an static data later we will call our API and load our data from database
  const { data, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  // destructure properties from tour object
  const { title, photo, desc, price, maxGroupSize, reviews } = data;

  const { avgRating } = calculateAvgRating(reviews);

  // date formate
  const options = { year: "numeric", month: "long", day: "numeric" };

  //submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    // later we will call our API and send this data to the server

    try {
      if (!user || user === undefined || user === null) {
        alert("Please login first");
      } else {
        const reviewObj = {
          reviewText,
          rating: reviewRating,
          username: user?.username,
        };

        const res = await fetch(`${BASE_URL}/reviews/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewObj),
        });

        const result = await res.json();
        if (!res.ok) {
          alert(result.message);
        }
        if (res.ok) {
          alert(result.message);
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
    <>
      <section>
        <Container>
          {loading && <h1>Loading...</h1>}
          {error && <h1>{error}</h1>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content ">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i>{" "}
                        {avgRating === 0 ? null : avgRating} ({reviews?.length}{" "}
                        reviews)
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${price}{" "}
                        / per person
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize}
                      </span>
                    </div>
                    <h5>Description</h5>
                    <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                  </div>

                  {/* Tour Reviews */}
                  <div className="tour__reviews mt-4 ">
                    <h4> Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                        <ReactStars
                          count={5}
                          onChange={setReviewReting}
                          size={28}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          required
                          ref={reviewMsgRef}
                          placeholder="share your thoughts "
                        />
                        <button
                          className="btn primary_btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews ">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100 ">
                            <div className="d-flex align-items-center justify-content-between ">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                <i className="ri-star-fill"></i> {review.rating}
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={data} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
