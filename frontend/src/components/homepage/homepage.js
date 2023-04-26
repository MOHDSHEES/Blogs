import React, { useEffect, useState } from "react";
// import NavBar from "../blog/navbar";
// import Topbar from "../blog/topbar";
// import Footer from "../footer/footer";
import CategorySlider from "./categorySlider";
import Featured from "./featured";
import MainImgSlider from "./mainImgSlider";
import TopCarousel from "./topCarousel";
import axios from "axios";

const Homepage = ({ trend, cate }) => {
  // const items = ["Item 1", "Item 2", "Item 3"];
  // for main Img slider top carousel recent blogs
  const [blogs, setblogs] = useState(null);
  // const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post("/api/recent/blogs");
      // console.log(data);
      if (data && data.length) setblogs(data);
      // setloading(false);
    })();
  }, []);
  return (
    <div>
      {/* {contextHolder} */}
      {/* <Topbar />
      <NavBar searchHandler={searchHandler} /> */}
      {/* {show && (
        <Alert
          style={{ zIndex: "3" }}
          className="alert1"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <p>Oops! Blog not found. Try searching another keyword. </p>
        </Alert>
      )} */}

      <div style={{ padding: "1rem 15px" }} class="container-fluid ">
        <div style={{ padding: "0" }} class="container">
          <TopCarousel data={blogs} />
          <MainImgSlider data={blogs} cate={cate} />
          <Featured trend={trend} />
          <div class="pt-3">
            <div class="row">
              {/* <CategorySkeleton /> */}
              {["Technology", "Cyber Security", "Business"].map(
                (category, idx) => {
                  return <CategorySlider key={idx} category={category} />;
                }
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
