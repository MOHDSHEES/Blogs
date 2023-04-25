import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TrendingSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 4].map(() => {
        return (
          <div class="d-flex mb-3">
            <Skeleton
              baseColor="#cdcbcb"
              highlightColor="#e6e5e5"
              // width={window.screen.width < 775 ? 280 : 490}
              height={80}
              duration={2}
            />
            <div
              class="w-100 d-flex flex-column justify-content-center bg-light px-3"
              style={{ height: "100px" }}
            >
              <div class="mb-1" style={{ fontSize: "13px" }}>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  // width={window.screen.width < 775 ? 280 : 490}
                  height={80}
                  duration={2}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrendingSkeleton;
