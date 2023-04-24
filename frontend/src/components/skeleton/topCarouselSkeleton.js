import React from "react";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const TopCarouselSkeleton = () => {
  return (
    <div>
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
        <div class="d-flex">
          <div style={{ width: "100%" }}>
            <Skeleton
              baseColor="#cdcbcb"
              highlightColor="#e6e5e5"
              // width={window.screen.width < 775 ? 280 : 490}
              height={80}
              duration={2}
            />
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default TopCarouselSkeleton;
