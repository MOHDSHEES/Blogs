import React, { useEffect, useState } from "react";
// import NavBar from "../blog/navbar";
// import Topbar from "../blog/topbar";
// import Footer from "../footer/footer";
import CategorySlider from "./categorySlider";
import Featured from "./featured";
import MainImgSlider from "./mainImgSlider";
import TopCarousel from "./topCarousel";
import CategorySkeleton from "../skeleton/categoryHomepageSkeleton";

const Homepage = ({ recent, trend, cate, categoryData }) => {
  // const items = ["Item 1", "Item 2", "Item 3"];
  // for main Img slider top carousel recent blogs
  const [blogs, setblogs] = useState(recent);
  // console.log(categoryData);
  // const [loading, setloading] = useState(false);
  useEffect(() => {
    setblogs(recent);
    // if (!blogs) {
    //   (async () => {
    //     // setloading(true);
    //     const { data } = await axios.post("/api/recent/blogs");
    //     // console.log(data);
    //     if (data && data.length) setblogs(data);
    //     // setloading(false);
    //   })();
    // }
  }, [recent]);
  // console.log(cate);
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
              {!categoryData
                ? [0, 1, 2, 3].map((c) => {
                    return <CategorySkeleton key={c} />;
                  })
                : Object.entries(categoryData).map((data, idx) => {
                    return (
                      <CategorySlider
                        key={idx + "cs"}
                        category={data[0]}
                        data={data[1]}
                      />
                    );
                  })}
              {/* {cate
                ? cate.map((category, idx) => {
                    return (
                      <CategorySlider
                        key={idx + "cs"}
                        category={category.category}
                      />
                    );
                  })
                : [0, 1, 2, 3].map((c) => {
                    return <CategorySkeleton key={c} />;
                  })} */}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
