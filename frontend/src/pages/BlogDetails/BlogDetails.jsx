import React from "react";
import "./blogDetails.css";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();

  //this is an static data later we will call our API and load our data from database
  const { data } = useFetch(`${BASE_URL}/blogs/${id}`);
  // destructure properties from tour object
  const { title, photo, desc, createdAt } = data;
  /* const replcedDesc = desc.replace(/\\n/g, "\n");
  console.log(replcedDesc);*/

  // date formate
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
      <section>
        <Container className="blog_details-section">
          <Row>
            <Col lg="8">
              <div className="blog__content ">
                <h1>{title}</h1>
                <h6>
                  <em>
                    Published on{" "}
                    {new Date(createdAt).toLocaleDateString("en-US", options)}
                  </em>
                </h6>
                <img src={photo} alt="" />
                <div className="blog__infoo">
                  <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogDetails;
