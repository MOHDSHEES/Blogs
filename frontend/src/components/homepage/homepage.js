import React, { useState } from "react";
import NavBar from "../blog/navbar";
import Topbar from "../blog/topbar";
import Footer from "../footer/footer";
import CategorySlider from "./categorySlider";
import Featured from "./featured";
import MainImgSlider from "./mainImgSlider";
import TopCarousel from "./topCarousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
// import CategorySkeleton from "../skeleton/categorySkeleton";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  async function searchHandler(search) {
    // e.preventDefault();
    // console.log(search);
    const { data } = await axios.post("/api/find/blog", {
      title: search,
    });

    // console.log(data);
    if (data.length) {
      const blog = data[0];
      navigate("/blog/" + data[0]._id, {
        state: blog,
      });
    } else {
      setShow(true);
    }
  }
  return (
    <div>
      <Topbar />
      <NavBar searchHandler={searchHandler} />
      {show && (
        <Alert
          style={{ zIndex: "3" }}
          className="alert1"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
          <p>Oops! Blog not found. Try searching another keyword. </p>
        </Alert>
      )}

      <div style={{ padding: "1rem 15px" }} class="container-fluid ">
        <div style={{ padding: "0" }} class="container">
          <TopCarousel />
          <MainImgSlider />
          <Featured />
          <div class="pt-3">
            <div class="row">
              {/* <CategorySkeleton /> */}
              {["Technology", "cyber security", "Trending", "business"].map(
                (category) => {
                  return <CategorySlider category={category} />;
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
