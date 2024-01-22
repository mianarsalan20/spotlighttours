import React from "react";
import { Link } from "react-router-dom";
import "./blogCard.css";
import { Container, Row, Col } from "reactstrap";

const BlogCard = ({ blog }) => {
  const { _id, title, desc, createdAt, photo } = blog;
  // date formate
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <Container className="blog__container">
      <Row className="blog__card">
        <Col lg="2">
          <div className="blog__img ">
            <img src={photo} alt="" />
          </div>
        </Col>
        <Col lg="10">
          <div className="blog__info">
            <h2>{title}</h2>
            <span>
              Published On{" "}
              {new Date(createdAt).toLocaleDateString("en-US", options)}
            </span>
            <div dangerouslySetInnerHTML={{ __html: desc }}></div>
            <button className="btn booking_btn">
              <Link to={`/blogs/${_id}`}>Read More</Link>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default BlogCard;
