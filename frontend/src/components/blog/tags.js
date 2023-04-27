import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Tags = ({ keyword }) => {
  const [keywords, setkeywords] = useState(null);
  useEffect(() => {
    setkeywords(keyword);
  }, [keyword]);
  return (
    <div>
      <div class="pb-3">
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Keywords</h3>
        </div>
        <div class="d-flex flex-wrap m-n1">
          {!keywords
            ? [0, 1, 2, 3, 4].map((c) => {
                return (
                  <Skeleton
                    key={c}
                    style={{ margin: "5px" }}
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    // width={window.screen.width < 775 ? 280 : 490}
                    height={40}
                    width={100}
                    duration={2}
                  />
                );
              })
            : keywords
                .split(",")
                .slice(0, 10)
                .map((str) => {
                  return (
                    <Link
                      key={str}
                      to=""
                      class="btn btn-sm btn-outline-secondary m-1"
                    >
                      {str}
                    </Link>
                  );
                })}

          {/* <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Politics
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Business
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Corporate
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Sports
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Health
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Education
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Science
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Technology
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Foods
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Entertainment
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Travel
          </a>
          <a href="" class="btn btn-sm btn-outline-secondary m-1">
            Lifestyle
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Tags;
