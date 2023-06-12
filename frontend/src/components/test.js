import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

const Test = () => {
  const [blog, setblog] = useState(null);
  useEffect(() => {
    // console.log("in");
    (async () => {
      const { data } = await axios.post("/api/find/blog/id", {
        id: "644a5ce7e670c40b48a5a318",
      });
      //   console.log("in");
      setblog(data);
      // setIsActive(true);
      // console.log(data);
    })();
  }, []);
  //   console.log(blog);
  return (
    <div style={{ padding: "1rem 15px" }} class="container-fluid ">
      <div style={{ padding: "0" }} class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="overlay position-relative bg-light">
              <div class="mb-3">{blog && parse(blog.blog[0].text)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
