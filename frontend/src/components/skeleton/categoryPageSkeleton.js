import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CategoryPageSkeleton = () => {
  return (
    <div class="col-lg-6">
      <div class="position-relative mb-3">
        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          // width={window.screen.width < 775 ? 280 : 490}
          height={400}
          duration={2}
        />
      </div>
    </div>
  );
};

export default CategoryPageSkeleton;
