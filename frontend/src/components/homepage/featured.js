import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Featured = () => {
  return (
    <div class="pt-4">
      {/* <div class="container-fluid py-3">
        <div class="container"> */}
      <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
        <h3 class="m-0">Featured</h3>
        <a
          class="text-secondary font-weight-medium text-decoration-none"
          href=""
        >
          View All
        </a>
      </div>
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
        {/* <div class="owl-carousel owl-carousel-2 carousel-item-4 position-relative"> */}
        <div
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
        </div>
        {/* </div> */}
      </OwlCarousel>
    </div>
    //   </div>
    // </div>
  );
};

export default Featured;
