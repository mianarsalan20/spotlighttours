import React from "react";
import { Row, Container, Col } from "reactstrap";
import RecommendedBlogCard from "./RecommendedBlogCard";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const RecommendedBlogs = () => {
  const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blogs`);
  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-5">
          <h1 className="text-center">Recommended Blogs</h1>
        </Col>

        {loading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}

        {!loading &&
          !error &&
          blogs?.map(
            (blog, index) =>
              index < 4 && (
                <Col lg="3" className="mb-4" key={blog._id}>
                  <RecommendedBlogCard blog={blog} />
                </Col>
              )
          )}
      </Row>
    </Container>
  );
};

export default RecommendedBlogs;
