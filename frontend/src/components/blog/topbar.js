import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
const Topbar = () => {
  return (
    <div>
      <div class="container-fluid">
        <div class="row align-items-center bg-light px-lg-5">
          <div class="col-12 col-md-8">
            <div
              style={{ overflow: "hidden" }}
              class="d-flex justify-content-between align-items-center"
            >
              <div
                class="bg-primary text-white text-center py-2 px-3"
                style={{ width: "100px" }}
              >
                Trending
              </div>
              <div style={{ width: "500px", padding: "10px" }}>
                <OwlCarousel
                  className="owl-theme  "
                  // style={{ marginLeft: "20px" }}
                  items={1}
                  loop
                  autoplay
                  autoplayTimeout={3000}
                  dots={false}
                  margin={10}
                  nav={false}
                >
                  <div className="item">
                    <div class="text-truncate">
                      <a class="text-secondary" href="">
                        The impact of artificial intelligence on the job market
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <div class="text-truncate">
                      <a class="text-secondary" href="">
                        The future of cybersecurity in the age of remote work
                      </a>
                    </div>
                  </div>
                </OwlCarousel>
              </div>

              {/* <div
                class="owl-carousel owl-carousel-1 tranding-carousel position-relative d-inline-flex align-items-center ml-3"
                style={{ width: "calc(100% - 100px)", paddingLeft: "90px" }}
              >
                <div class="text-truncate">
                  <a class="text-secondary" href="">
                    The impact of artificial intelligence on the job market
                  </a>
                </div>
                <div class="text-truncate">
                  <a class="text-secondary" href="">
                    The future of cybersecurity in the age of remote work
                  </a>
                </div>
              </div> */}
            </div>
          </div>
          <div class="col-md-4 text-right d-none d-md-block">
            {new Date().toLocaleString("en-US", { weekday: "long" })},{" "}
            {new Date().toLocaleString("en-US", { month: "long" })},{" "}
            {new Date().getDate()}, {new Date().getFullYear()}
            {/* Monday, January 01, 2045 */}
          </div>
        </div>
        <div class="row align-items-center py-2 px-lg-5">
          <div class="col-lg-4">
            <Link to="/" class="navbar-brand d-none d-lg-block">
              <h1 class="m-0  text-uppercase">
                <span class="text-primary">Off</span>the
                <span class="text-primary">Web</span>
              </h1>
            </Link>
          </div>
          <div class="col-lg-8 text-center text-lg-right">
            <img class="img-fluid" src="img/advertise.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
