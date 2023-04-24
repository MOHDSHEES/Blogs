import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainImgSlider = ({ data }) => {
  // console.log(data);
  useEffect(() => {
    setblogs(data);
  }, [data]);
  const [blogs, setblogs] = useState(null);
  // console.log(blogs);
  return (
    <div className="pt-3">
      {/* <div style={{ padding: "1rem 15px" }} class="container-fluid ">
        <div style={{ padding: "0" }} class="container"> */}
      <div class="row">
        <div class="col-lg-8">
          {!blogs ? (
            <Skeleton
              baseColor="#cdcbcb"
              highlightColor="#e6e5e5"
              // width={window.screen.width < 775 ? 280 : 490}
              height={500}
              duration={2}
            />
          ) : (
            <OwlCarousel
              className="owl-theme "
              // style={{ marginLeft: "20px" }}
              items={1}
              loop
              autoplay
              autoplayTimeout={3000}
              // dots={false}
              margin={10}
              nav={false}
            >
              {blogs.length
                ? blogs.map((blog) => {
                    return (
                      <div
                        key={blog._id}
                        class="position-relative overflow-hidden"
                        style={{ height: "435px" }}
                      >
                        <img
                          class="img-fluid h-100"
                          src={blog.mainImg}
                          style={{ objectFit: "cover" }}
                          alt={blog.category}
                        />
                        <div class="overlay">
                          <div class="mb-1">
                            <a class="text-white" href="">
                              {blog.category} cfggh h
                            </a>
                            <span class="px-2 text-white">/</span>
                            <a class="text-white" href="">
                              April 01, 2023
                            </a>
                          </div>
                          <Link
                            class="h2 m-0 text-white font-weight-bold"
                            to={"/blog/" + blog._id}
                            state={blog}
                          >
                            {blog.title}
                          </Link>
                        </div>
                      </div>
                    );
                  })
                : ""}
              {/* <div
              class="position-relative overflow-hidden"
              style={{ height: "435px" }}
            >
              <img
                class="img-fluid h-100"
                src="img/news-700x435-1.jpg"
                style={{ objectFit: "cover" }}
              />
              <div class="overlay">
                <div class="mb-1">
                  <a class="text-white" href="">
                    Technology
                  </a>
                  <span class="px-2 text-white">/</span>
                  <a class="text-white" href="">
                    April 01, 2023
                  </a>
                </div>
                <a class="h2 m-0 text-white font-weight-bold" href="">
                  The benefits and drawbacks of remote work in the tech industry
                </a>
              </div>
            </div>
            <div
              class="position-relative overflow-hidden"
              style={{ height: "435px" }}
            >
              <img
                class="img-fluid h-100"
                src="img/news-700x435-2.jpg"
                style={{ objectFit: "cover" }}
              />
              <div class="overlay">
                <div class="mb-1">
                  <a class="text-white" href="">
                    Technology
                  </a>
                  <span class="px-2 text-white">/</span>
                  <a class="text-white" href="">
                    April 01, 2023
                  </a>
                </div>
                <a class="h2 m-0 text-white font-weight-bold" href="">
                  How technology is changing the way we learn and educate
                </a>
              </div>
            </div> */}
              {/* </div> */}
            </OwlCarousel>
          )}
        </div>
        <div class="col-lg-4">
          <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
            <h3 class="m-0">Categories</h3>
            <a
              class="text-secondary font-weight-medium text-decoration-none"
              href=""
            >
              View All
            </a>
          </div>
          <div
            class="position-relative overflow-hidden mb-3"
            style={{ height: "80px" }}
          >
            <img
              class="img-fluid w-100 h-100"
              src="img/cat-500x80-1.jpg"
              style={{ objectFit: "cover" }}
            />
            <a
              href=""
              class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
            >
              Business
            </a>
          </div>
          <div
            class="position-relative overflow-hidden mb-3"
            style={{ height: "80px" }}
          >
            <img
              class="img-fluid w-100 h-100"
              src="img/cat-500x80-2.jpg"
              style={{ objectFit: "cover" }}
            />
            <a
              href=""
              class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
            >
              Technology
            </a>
          </div>
          <div
            class="position-relative overflow-hidden mb-3"
            style={{ height: "80px" }}
          >
            <img
              class="img-fluid w-100 h-100"
              src="img/cat-500x80-3.jpg"
              style={{ objectFit: "cover" }}
            />
            <a
              href=""
              class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
            >
              Entertainment
            </a>
          </div>
          <div
            class="position-relative overflow-hidden"
            style={{ height: "80px" }}
          >
            <img
              class="img-fluid w-100 h-100"
              src="img/cat-500x80-4.jpg"
              style={{ objectFit: "cover" }}
            />
            <a
              href=""
              class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
            >
              Sports
            </a>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default MainImgSlider;
