import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import resizeImg from "../functions/resizeImg";
import { useContext } from "react";
import { globalContext } from "../../context";

const MoreCategoriesPage = () => {
  const { categories } = useContext(globalContext);

  return (
    <div class="container-fluid" style={{ padding: "1rem 15px" }}>
      <div class="container" style={{ padding: "0" }}>
        {/* <div class="row">
          <div class="col-lg-8"> */}
        <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Categories</h3>
        </div>
        <div class="row">
          {!categories
            ? [0, 1, 2].map((c) => {
                return (
                  <div className="mb-3 col-lg-4">
                    <Skeleton
                      key={c}
                      baseColor="#cdcbcb"
                      highlightColor="#e6e5e5"
                      // width={window.screen.width < 775 ? 280 : 490}
                      height={80}
                      duration={2}
                    />
                  </div>
                );
              })
            : categories.map((c, idx) => {
                return (
                  <div key={c + idx} class="col-lg-4">
                    <div
                      // key={idx + "id"}
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
                  </div>
                );
              })}
        </div>
      </div>
      {/* </div>
      </div> */}
    </div>
  );
};

export default MoreCategoriesPage;
