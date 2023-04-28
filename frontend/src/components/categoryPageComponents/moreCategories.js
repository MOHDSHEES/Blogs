import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoreCategories = ({ blog }) => {
  const [blogs, setblogs] = useState(null);
  useEffect(() => {
    setblogs(blog);
  }, [blog]);
  return (
    <div class="row">
      {blogs &&
        blogs.map((blog) => {
          return (
            <div key={blog._id} class="col-lg-6">
              <div class="d-flex mb-3">
                <img
                  src={blog.mainImg}
                  alt={blog.category}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div
                  class="w-100 d-flex flex-column justify-content-center bg-light px-3"
                  style={{ height: "100px" }}
                >
                  <div class="mb-1" style={{ fontSize: "13px" }}>
                    <Link
                      to={"/blog/" + blog._id + "/" + blog.title}
                      state={blog}
                    >
                      {blog.category}
                    </Link>
                    <span class="px-1">/</span>
                    <span>{blog.createdDate}</span>
                  </div>
                  <Link
                    to={"/blog/" + blog._id + "/" + blog.title}
                    state={blog}
                    class="h6 m-0 break-line-3"
                  >
                    {blog.title}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MoreCategories;
