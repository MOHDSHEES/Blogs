import React, { useEffect, useState } from "react";
// import NavBar from "../blog/navbar";
// import Topbar from "../blog/topbar";
// import Footer from "../footer/footer";
import CategorySlider from "./categorySlider";
import Featured from "./featured";
import MainImgSlider from "./mainImgSlider";
import TopCarousel from "./topCarousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
// import { closeMessage } from "../functions/message";
// import { message } from "antd";
// import CategorySkeleton from "../skeleton/categorySkeleton";

const Homepage = () => {
  // const [show, setShow] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();
  // const navigate = useNavigate();
  // async function searchHandler(search) {
  //   // e.preventDefault();
  //   // console.log(search);
  //   const { data } = await axios.post("/api/find/blog", {
  //     title: search,
  //   });

  //   // console.log(data);
  //   if (data.length) {
  //     const blog = data[0];
  //     navigate("/blog/" + data[0]._id, {
  //       state: blog,
  //     });
  //   } else {
  //     closeMessage(
  //       messageApi,
  //       "Oops! Blog not found. Try searching another keyword.",
  //       "error"
  //     );
  //     // setShow(true);
  //   }
  // }

  // for main Img slider recent blogs
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
          <MainImgSlider data={blogs} />
          <Featured />
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
