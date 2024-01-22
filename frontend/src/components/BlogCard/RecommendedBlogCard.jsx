import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./recommendedBlogCard.css";

const RecommendedBlogCard = ({ blog }) => {
  const { _id, title, desc, createdAt, photo } = blog;
  // date formate
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt="Blog-img" />
        </div>
        <CardBody>
          <h5 className="tour__title">
            <Link to={`/blogs/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <button className="btn booking_btn">
              <Link to={`/blogs/${_id}`}>Read More</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default RecommendedBlogCard;
