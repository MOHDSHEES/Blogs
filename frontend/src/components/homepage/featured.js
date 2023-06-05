import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import resizeImg from "../functions/resizeImg";
import { useContext } from "react";
import { globalContext } from "../../context";

const Featured = () => {
  const { trending } = useContext(globalContext);
  const [blogs, setblogs] = useState(null);
  // const [loading, setloading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     // setloading(true);
  //     const { data } = await axios.post("/api/blog/trending");
  //     // console.log(data);
  //     if (data && data.length) setblogs(data);
  //     // setloading(false);
  //   })();
  // }, []);
  useEffect(() => {
    setblogs(trending);
  }, [trending]);
  // console.log(blogs);
  return (
    <div class="pt-4">
      {/* <div class="container-fluid py-3">
        <div class="container"> */}
      <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
        <h3 class="m-0">Trending</h3>
        {/* <a
          class="text-secondary font-weight-medium text-decoration-none"
          href=""
        >
          View All
        </a> */}
      </div>
      {!blogs ? (
        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          // width={window.screen.width < 775 ? 280 : 490}
          height={290}
          duration={2}
        />
      ) : (
        <OwlCarousel
          className="owl-theme "
          // style={{ marginLeft: "20px" }}
          items={4}
          loop
          autoplay
          autoplayTimeout={3000}
          // dots={false}
          margin={10}
          nav={false}
          responsive={{
            0: {
              items: 1,
              dots: true,
            },
            480: {
              items: 1,
              dots: true,
            },
            768: {
              items: 3,
            },
            992: {
              items: 4,
            },
            1280: {
              items: 4,
            },
          }}
        >
          {blogs.length &&
            blogs.map((blog) => {
              return (
                <div
                  key={blog._id}
                  class="position-relative overflow-hidden"
                  style={{ height: "300px" }}
                >
                  <img
                    class="img-fluid w-100 h-100"
                    src={resizeImg(blog.mainImg, 6, "h_250,c_scale")}
                    // src={blog.mainImg}
                    alt={blog.category}
                    style={{ objectFit: "cover" }}
                  />
                  <div class="overlay">
                    <div class="mb-1" style={{ fontSize: "13px" }}>
                      <Link
                        class="text-white"
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
                      <span class="px-1 text-white">/</span>
                      <Link
                        class="text-white"
                        to={
                          "/blog/" +
                          blog._id +
                          "/" +
                          blog.title.replace(/ /g, "-")
                        }
                        state={blog}
                      >
                        Views: {blog.views}
                      </Link>
                    </div>
                    <Link
                      class="h4 m-0 text-white"
                      to={
                        "/blog/" +
                        blog._id +
                        "/" +
                        blog.title.replace(/ /g, "-")
                      }
                      state={blog}
                    >
                      {blog.title}
                    </Link>
                  </div>
                </div>
              );
            })}

          {/* <div
          class="position-relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <img
            class="img-fluid w-100 h-100"
            src="img/news-300x300-1.jpg"
            style={{ objectFit: "cover" }}
          />
          <div class="overlay">
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a class="text-white" href="">
                Technology
              </a>
              <span class="px-1 text-white">/</span>
              <a class="text-white" href="">
                January 01, 2045
              </a>
            </div>
            <a class="h4 m-0 text-white" href="">
              The intersection of technology and fashion
            </a>
          </div>
        </div>
        <div
          class="position-relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <img
            class="img-fluid w-100 h-100"
            src="img/news-300x300-2.jpg"
            style={{ objectFit: "cover" }}
          />
          <div class="overlay">
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a class="text-white" href="">
                Technology
              </a>
              <span class="px-1 text-white">/</span>
              <a class="text-white" href="">
                January 01, 2045
              </a>
            </div>
            <a class="h4 m-0 text-white" href="">
              The potential of quantum computing
            </a>
          </div>
        </div>
        <div
          class="position-relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <img
            class="img-fluid w-100 h-100"
            src="img/news-300x300-3.jpg"
            style={{ objectFit: "cover" }}
          />
          <div class="overlay">
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a class="text-white" href="">
                Technology
              </a>
              <span class="px-1 text-white">/</span>
              <a class="text-white" href="">
                January 01, 2045
              </a>
            </div>
            <a class="h4 m-0 text-white" href="">
              How technology is changing the music industry
            </a>
          </div>
        </div>
        <div
          class="position-relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <img
            class="img-fluid w-100 h-100"
            src="img/news-300x300-4.jpg"
            style={{ objectFit: "cover" }}
          />
          <div class="overlay">
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a class="text-white" href="">
                Technology
              </a>
              <span class="px-1 text-white">/</span>
              <a class="text-white" href="">
                January 01, 2045
              </a>
            </div>
            <a class="h4 m-0 text-white" href="">
              The role of technology in the future of agriculture
            </a>
          </div>
        </div>
        <div
          class="position-relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <img
            class="img-fluid w-100 h-100"
            src="img/news-300x300-5.jpg"
            style={{ objectFit: "cover" }}
          />
          <div class="overlay">
            <div class="mb-1" style={{ fontSize: "13px" }}>
              <a class="text-white" href="">
                Technology
              </a>
              <span class="px-1 text-white">/</span>
              <a class="text-white" href="">
                January 01, 2045
              </a>
            </div>
            <a class="h4 m-0 text-white" href="">
              The benefits of learning to code
            </a>
          </div>
        </div> */}
          {/* </div> */}
        </OwlCarousel>
      )}
    </div>
    //   </div>
    // </div>
  );
};

export default Featured;
