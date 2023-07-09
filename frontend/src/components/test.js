import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

const Test = () => {
  const [blog, setblog] = useState(null);
  useEffect(() => {
    // console.log("in");
    (async () => {
      const { data } = await axios.post("/api/find/blog/new/id", {});
      //   console.log("in");
      setblog(data);
      // setIsActive(true);
      // console.log(data);
    })();
  }, []);
  console.log(blog);
  return (
    <div style={{ padding: "1rem 15px" }} class="container-fluid ">
      <div style={{ padding: "0" }} class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="overlay position-relative bg-light">
              <img
                class="img-fluid w-100"
                src={blog && blog.mainImg}
                alt={blog && blog.title}
                style={{ objectFit: "cover" }}
              />
              <div class="mb-3 blog-con">{blog && parse(blog.blog)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
