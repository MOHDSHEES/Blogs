import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import TopCarouselSkeleton from "../skeleton/topCarouselSkeleton";

const TopCarousel = ({ data }) => {
  const [blogs, setblogs] = useState(null);
  // const [loading, setloading] = useState(false);

  useEffect(() => {
    setblogs(data);
  }, [data]);
  // useEffect(() => {
  //   (async () => {
  //     setloading(true);
  //     const { data } = await axios.post("/api/recent/blogs");
  //     // console.log(data);
  //     if (data && data.length) setblogs(data);
  //     setloading(false);
  //   })();
  // }, []);
  // console.log(blogs && blogs[0]);
  return (
    <div>
      {!blogs ? (
        <TopCarouselSkeleton />
      ) : (
        blogs && (
          <OwlCarousel
            className="owl-theme "
            // style={{ marginLeft: "20px" }}
            items={3}
            loop
            autoplay
            autoplayTimeout={3000}
            // dots={false}
            margin={10}
            nav={false}
            responsive={{
              0: {
                items: 1,
                dots: false,
              },
              480: {
                items: 1,
                dots: false,
              },
              768: {
                items: 2,
              },
              992: {
                items: 3,
              },
              1280: {
                items: 3,
              },
            }}
          >
            {blogs.map((blog) => {
              return (
                <Link
                  to={"/blog/" + blog._id}
                  state={blog}
                  id={blog._id}
                  className="item"
                >
                  <div class="d-flex">
                    <img
                      src={blog.mainImg}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      class="d-flex align-items-center bg-light px-3"
                      style={{ height: "80px", width: "80%" }}
                    >
                      <p class="text-secondary font-weight-semi-bold">
                        {blog.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* <div className="item">
          <div class="d-flex">
            <img
              src="img/news-100x100-1.jpg"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div
              class="d-flex align-items-center bg-light px-3"
              style={{ height: "80px" }}
            >
              <a class="text-secondary font-weight-semi-bold" href="">
                The rise of virtual and augmented reality in gaming and beyond
              </a>
            </div>
          </div>
        </div> */}
            {/* <div className="item">
          <div class="d-flex">
            <img
              src="img/news-100x100-1.jpg"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div
              class="d-flex align-items-center bg-light px-3"
              style={{ height: "80px" }}
            >
              <a class="text-secondary font-weight-semi-bold" href="">
                The rise of virtual and augmented reality in gaming and beyond
              </a>
            </div>
          </div>
        </div> */}
          </OwlCarousel>
        )
      )}
    </div>
    //   </div>
    // </div>
  );
};

export default TopCarousel;
