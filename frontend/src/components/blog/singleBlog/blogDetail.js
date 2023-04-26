import React, { useState } from "react";
// import Footer from "../../footer/footer";
import Blog from "./blog";
import Breadcrumb from "./breadcrumb";
import CommentModal from "./commentModal";
import Comments from "./comments";
// import Navbar from "../navbar";
import Newsletter from "../newsletter";
import Socialfollow from "../socialfollow";
import Tags from "../tags";
// import Topbar from "../topbar";
import Trending from "../trending";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
// import { message } from "antd";
// import { closeMessage } from "../../functions/message";

const BlogDetail = () => {
  // const [messageApi, contextHolder] = message.useMessage();
  // // const [blog, setBlog] = useState(null);
  // const navigate = useNavigate();
  // // const [show, setShow] = useState(false);
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
  //     // console.log(data[0]);
  //     // setBlog(data[0]);
  //     // setId(data[0]._id);
  //     // setblog(data[0].blog);
  //     // setcategory(data[0].category);
  //     // setmainImg(data[0].mainImg);
  //     // settitle(data[0].title);
  //     // setUpdateFlag(0);
  //   } else {
  //     // console.log("else");
  //     closeMessage(
  //       messageApi,
  //       "Oops! Blog not found. Try searching another keyword.",
  //       "error"
  //     );
  //     // setShow(true);
  //     // reset();
  //   }
  // }

  return (
    <div>
      {/* {contextHolder} */}
      {/* <Topbar />
      <Navbar searchHandler={searchHandler} /> */}
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
      <Breadcrumb />
      <div style={{ padding: "1rem 15px" }} class="container-fluid ">
        <div style={{ padding: "0" }} class="container">
          <div class="row">
            <div class="col-lg-8">
              <Blog />
              {/* <Comments />
              <CommentModal /> */}
            </div>
            <div class="col-lg-4 pt-3 pt-lg-0">
              <Socialfollow />
              {/* <Newsletter /> */}
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
      {/* <Footer /> */}
    </div>
  );
};

export default BlogDetail;
