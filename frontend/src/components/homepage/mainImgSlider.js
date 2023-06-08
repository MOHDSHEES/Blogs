import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import resizeImg from "../functions/resizeImg";
import { globalContext } from "../../context";
import { useContext } from "react";

const MainImgSlider = () => {
  // console.log(data);
  const { recentBlogs, categories: cate } = useContext(globalContext);
  const [blogs, setblogs] = useState(null);
  const [categories, setcategories] = useState(null);
  useEffect(() => {
    setblogs(recentBlogs);
    setcategories(cate);
  }, [recentBlogs, cate]);

  // useEffect(() => {
  //   (async () => {
  //     // setloading(true);
  //     const { data } = await axios.post("/api/find/categories");
  //     // console.log(data);
  //     if (data && data.length) setcategories(data);
  //     // setloading(false);
  //   })();
  // }, []);
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
              height={450}
              duration={2}
            />
          ) : (
            <OwlCarousel
              className="owl-theme "
              // style={{ marginLeft: "20px" }}
              items={1}
              autoplayHoverPause
              loop
              autoplay
              autoplayTimeout={3000}
              // dots={false}
              margin={10}
              nav={false}
            >
              {blogs.length
                ? blogs.map((blog, idx) => {
                    return (
                      <div
                        key={blog._id + idx}
                        class="position-relative overflow-hidden"
                        style={{ height: "435px" }}
                      >
                        <img
                          class="img-fluid h-100"
                          src={resizeImg(blog.mainImg, 6, "h_350,c_scale")}
                          // src={blog.mainImg}
                          style={{ objectFit: "cover" }}
                          alt={blog.category}
                        />
                        <div class="overlay">
                          <div class="mb-1">
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
                            <span class="px-2 text-white">/</span>
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
                              {blog.createdDate}
                            </Link>
                          </div>
                          <Link
                            class="h2 m-0 text-white font-weight-bold"
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
                  })
                : ""}
            </OwlCarousel>
          )}
        </div>
        <div class="col-lg-4">
          <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
            <h3 class="m-0">Categories</h3>
            <Link
              class="text-secondary font-weight-medium text-decoration-none"
              to="/categories"
            >
              View All
            </Link>
          </div>
          {!categories
            ? [0, 1, 2, 3].map((c) => {
                return (
                  <div key={c} className="mb-3">
                    <Skeleton
                      baseColor="#cdcbcb"
                      highlightColor="#e6e5e5"
                      // width={window.screen.width < 775 ? 280 : 490}
                      height={80}
                      duration={2}
                    />
                  </div>
                );
              })
            : categories.slice(0, 4).map((c, idx) => {
                return (
                  <div
                    key={idx + "id"}
                    class="position-relative overflow-hidden mb-3"
                    style={{ height: "80px" }}
                  >
                    <img
                      class="img-fluid w-100 h-100"
                      src={resizeImg(c.categoryImg, 6, "h_100,c_scale")}
                      // src={c.categoryImg}
                      alt={c.category}
                      style={{ objectFit: "cover" }}
                    />
                    <Link
                      to={"/blogs/" + c.category}
                      class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none"
                    >
                      {c.category}
                    </Link>
                  </div>
                );
              })}
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default MainImgSlider;
