import React, { useEffect, useState } from "react";
import Newsletter from "../blog/newsletter";
import Socialfollow from "../blog/socialfollow";
// import Tags from "../blog/tags";
import Trending from "../blog/trending";
import Categories from "./categories";
import MoreCategories from "./moreCategories";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setblogs] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post("/api/find/blog/categories", {
        category: category,
      });
      if (data && data.length) setblogs(data);
      else {
        navigate("/");
      }
      // setloading(false);
    })();
  }, [category, navigate]);

  return (
    <div class="container-fluid" style={{ padding: "1rem 15px" }}>
      <div class="container" style={{ padding: "0" }}>
        <div class="row">
          <div class="col-lg-8">
            <Categories blog={blogs && blogs.slice(0, 4)} />
            {blogs && blogs.length > 4 && (
              <MoreCategories blog={blogs && blogs.slice(4)} />
            )}
          </div>
          <div class="col-lg-4 pt-3 pt-lg-0">
            <Socialfollow />
            <Newsletter />
            <div class="mb-3 pb-3">
              <a href="#!">
                <img class="img-fluid" src="/img/news-500x280-2.jpg" alt="" />
              </a>
            </div>
            <Trending />
            {/* <Tags /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
