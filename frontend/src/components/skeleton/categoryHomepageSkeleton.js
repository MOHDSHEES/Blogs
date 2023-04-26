import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import OwlCarousel from "react-owl-carousel";

const CategorySkeleton = () => {
  return (
    <div class="col-lg-6 py-3">
      <>
        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          // width={window.screen.width < 775 ? 280 : 490}
          height={50}
          duration={2}
        />

        <OwlCarousel
          className="owl-theme owl-carousel-3 carousel-item-2 position-relative "
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
          <div class="position-relative">
            <Skeleton
              baseColor="#cdcbcb"
              highlightColor="#e6e5e5"
              // width={window.screen.width < 775 ? 280 : 490}
              height={200}
              duration={2}
            />
            <div class=" bg-light">
              <Skeleton
                style={{ marginTop: "10px" }}
                baseColor="#cdcbcb"
                highlightColor="#e6e5e5"
                // width={window.screen.width < 775 ? 280 : 490}
                height={80}
                duration={2}
              />
            </div>
          </div>
        </OwlCarousel>
      </>
    </div>
  );
};

export default CategorySkeleton;
