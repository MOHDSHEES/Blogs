import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrendingSkeleton from "../skeleton/trendingSkeleton";
import resizeImg from "../functions/resizeImg";
import { useContext } from "react";
import { globalContext } from "../../context";

const Trending = () => {
  // const [loading, setloading] = useState(false);
  const { trending } = useContext(globalContext);
  const [blogs, setblogs] = useState(trending);
  // console.log(trending);
  useEffect(() => {
    setblogs(trending);
  }, [trending]);
  // useEffect(() => {
  //   if (!blogs) {
  //     (async () => {
  //       setloading(true);
  //       const { data } = await axios.post("/api/blog/trending");
  //       // console.log(data);
  //       if (data && data.length) setblogs(data);
  //       setloading(false);
  //     })();
  //   }
  // }, [blogs]);
  return (
    <div>
      <div class="pb-3">
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Trending</h3>
        </div>

        {!trending ? (
          <TrendingSkeleton />
        ) : (
          blogs &&
          blogs.map((blog, idx) => {
            return (
              <div key={"id" + idx} class="d-flex mb-3">
                <img
                  src={resizeImg(blog.mainImg, 6, "h_150,c_scale")}
                  // src={blog.mainImg}
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
                      to={
                        "/blog/" +
                        blog._id +
                        "/" +
                        blog.title.replace(/ /g, "-")
                      }
                      state={blog}
                    >
                      {blog.category}
                    </Link>
                    <span class="px-1">/</span>
                    <span>views: {blog.views}</span>
                  </div>
                  <Link
                    className="h6 m-0 break-line-3 "
                    to={
                      "/blog/" + blog._id + "/" + blog.title.replace(/ /g, "-")
                    }
                    state={blog}
                  >
                    {blog.title}
                  </Link>
                </div>
              </div>
            );
          })
        )}
        {/*        
        <div class="d-flex mb-3">
          <img
            src="img/news-100x100-2.jpg"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div
            class="w-100 d-flex flex-column justify-content-center bg-light px-3"
            style={{ height: "100px" }}
          >
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a href="">Technology</a>
              <span class="px-1">/</span>
              <span>January 01, 2045</span>
            </div>
            <a class="h6 m-0" href="">
              Lorem ipsum dolor sit amet consec adipis elit
            </a>
          </div>
        </div>
        <div class="d-flex mb-3">
          <img
            src="img/news-100x100-3.jpg"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div
            class="w-100 d-flex flex-column justify-content-center bg-light px-3"
            style={{ height: "100px" }}
          >
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a href="">Technology</a>
              <span class="px-1">/</span>
              <span>January 01, 2045</span>
            </div>
            <a class="h6 m-0" href="">
              Lorem ipsum dolor sit amet consec adipis elit
            </a>
          </div>
        </div>
        <div class="d-flex mb-3">
          <img
            src="img/news-100x100-4.jpg"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div
            class="w-100 d-flex flex-column justify-content-center bg-light px-3"
            style={{ height: "100px" }}
          >
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a href="">Technology</a>
              <span class="px-1">/</span>
              <span>January 01, 2045</span>
            </div>
            <a class="h6 m-0" href="">
              Lorem ipsum dolor sit amet consec adipis elit
            </a>
          </div>
        </div>
        <div class="d-flex mb-3">
          <img
            src="img/news-100x100-5.jpg"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div
            class="w-100 d-flex flex-column justify-content-center bg-light px-3"
            style={{ height: "100px" }}
          >
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a href="">Technology</a>
              <span class="px-1">/</span>
              <span>January 01, 2045</span>
            </div>
            <a class="h6 m-0" href="">
              Lorem ipsum dolor sit amet consec adipis elit
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Trending;
