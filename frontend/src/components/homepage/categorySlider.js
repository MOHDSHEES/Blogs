import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import CategorySkeleton from "../skeleton/categoryHomepageSkeleton";

const CategorySlider = ({ category }) => {
  //   console.log(category);
  const [blog, setblog] = useState(null);
  const [loading, setloading] = useState(false);
  //   console.log(blog);

  useEffect(() => {
    (async () => {
      setloading(true);
      const { data } = await axios.post("/api/category/blogs", {
        category: category,
      });
      // console.log(data);
      if (data && data.length) setblog(data);
      setloading(false);
    })();
  }, [category]);
  return loading ? (
    <CategorySkeleton />
  ) : (
    <div class="col-lg-6 py-3">
      {blog && blog.length && (
        <>
          <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
            <h3 class="m-0">{category}</h3>

            <Link
              class="text-secondary font-weight-medium text-decoration-none"
              to={"/blogs/" + category}
            >
              View All
            </Link>
          </div>

          <OwlCarousel
            className="owl-theme owl-carousel-3 carousel-item-2 position-relative "
            // style={{ marginLeft: "20px" }}
            // items={2}
            loop
            autoplay
            autoplayTimeout={3000}
            dots={false}
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
                items: 2,
              },
              992: {
                items: 2,
              },
              1280: {
                items: 2,
              },
            }}
          >
            {/* <div class="owl-carousel owl-carousel-3 carousel-item-2 position-relative"> */}
            {blog
              .slice(-5)
              .reverse()
              .map((bl) => {
                return (
                  <div key={bl._id} class="position-relative">
                    <img
                      class="img-fluid w-100"
                      src={bl.mainImg}
                      alt={bl.category}
                      style={{ objectFit: "cover" }}
                    />
                    <div class="overlay position-relative bg-light">
                      {/* <div class="mb-2" style={{ fontSize: "13px" }}>
            <a href="">Technology</a>
            <span class="px-1">/</span>
            <span>January 01, 2045</span>
          </div> */}
                      <Link
                        class="h4 m-0"
                        to={"/blog/" + bl._id + "/" + bl.title}
                        state={bl}
                      >
                        {bl.title}
                      </Link>
                    </div>
                  </div>
                );
              })}
          </OwlCarousel>
        </>
      )}
    </div>
  );

  // <div class="col-lg-6 py-3">
  //   <div class="bg-light py-2 px-4 mb-3">
  //     <h3 class="m-0">Technology</h3>
  //   </div>
  //   <OwlCarousel
  //     className="owl-theme "
  //     // style={{ marginLeft: "20px" }}
  //     items={2}
  //     loop
  //     autoplay
  //     autoplayTimeout={3000}
  //     dots={false}
  //     margin={10}
  //     nav={false}
  //     responsive={{
  //       0: {
  //         items: 1,
  //         dots: true,
  //       },
  //       480: {
  //         items: 1,
  //         dots: true,
  //       },
  //       768: {
  //         items: 2,
  //       },
  //       992: {
  //         items: 2,
  //       },
  //       1280: {
  //         items: 2,
  //       },
  //     }}
  //   >
  //     {/* <div class="owl-carousel owl-carousel-3 carousel-item-2 position-relative"> */}
  //     <div class="position-relative">
  //       <img
  //         class="img-fluid w-100"
  //         src="/img/news-500x280-4.jpg"
  //         style={{ objectFit: "cover" }}
  //       />
  //       <div class="overlay position-relative bg-light">
  //         <div class="mb-2" style={{ fontSize: "13px" }}>
  //           <a href="">Technology</a>
  //           <span class="px-1">/</span>
  //           <span>January 01, 2045</span>
  //         </div>
  //         <a class="h4 m-0" href="">
  //           The importance of software localization and
  //           internationalization
  //         </a>
  //       </div>
  //     </div>
  //     <div class="position-relative">
  //       <img
  //         class="img-fluid w-100"
  //         src="img/news-500x280-1.jpg"
  //         style={{ objectFit: "cover" }}
  //       />
  //       <div class="overlay position-relative bg-light">
  //         <div class="mb-2" style={{ fontSize: "13px" }}>
  //           <a href="">Technology</a>
  //           <span class="px-1">/</span>
  //           <span>January 01, 2045</span>
  //         </div>
  //         <a class="h4 m-0" href="">
  //           The role of gamification in software development
  //         </a>
  //       </div>
  //     </div>
  //     <div class="position-relative">
  //       <img
  //         class="img-fluid w-100"
  //         src="img/news-500x280-2.jpg"
  //         style={{ objectFit: "cover" }}
  //       />
  //       <div class="overlay position-relative bg-light">
  //         <div class="mb-2" style={{ fontSize: "13px" }}>
  //           <a href="">Technology</a>
  //           <span class="px-1">/</span>
  //           <span>January 01, 2045</span>
  //         </div>
  //         <a class="h4 m-0" href="">
  //           The importance of user research in UX design
  //         </a>
  //       </div>
  //     </div>
  //     {/* </div> */}
  //   </OwlCarousel>
  // </div>

  //   </div>
  // </div>
};

export default CategorySlider;
