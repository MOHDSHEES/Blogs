import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const TopCarousel = () => {
  return (
    <div>
      {/* <div class="container-fluid py-3">
        <div class="container"> */}
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
        <div className="item">
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
        </div>
        <div className="item">
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
        </div>
        <div className="item">
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
        </div>
        <div className="item">
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
        </div>
      </OwlCarousel>
    </div>
    //   </div>
    // </div>
  );
};

export default TopCarousel;
