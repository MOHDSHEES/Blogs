import React, { useEffect, useState } from "react";
// import Footer from "../../footer/footer";
import Blog from "./blog";
import Breadcrumb from "./breadcrumb";
// import CommentModal from "./commentModal";
// import Comments from "./comments";
// import Navbar from "../navbar";
// import Newsletter from "../newsletter";
import Socialfollow from "../socialfollow";
import Tags from "../tags";
// import Topbar from "../topbar";
import Trending from "../trending";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
// import { message } from "antd";
// import { closeMessage } from "../../functions/message";

const BlogDetail = ({ trending }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);
  const { id } = useParams();
  // console.log(id);
  // console.log(id);
  const [blog, setblog] = useState(null);
  // console.log(state);
  // console.log(blog);
  useEffect(() => {
    if (state && Object.keys(state).length !== 0) {
      if (blog && blog.isAdmin) {
        setblog(state);
      } else if (blog && blog.status !== "Active") {
        navigate("/");
        // setblog(state);
      } else {
        setblog(state);
      }
    } else {
      (async () => {
        const { data } = await axios.post("/api/find/blog/id", {
          id: id,
        });
        // console.log(data);
        if (data && data._id && data.status === "Active") setblog(data);
        else {
          navigate("/");
        }
      })();
    }
  }, [state, id, blog, navigate]);
  // console.log(blog);

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
      <Breadcrumb category={blog && blog.category} />
      <div style={{ padding: "1rem 15px" }} class="container-fluid ">
        <div style={{ padding: "0" }} class="container">
          <div class="row">
            <div class="col-lg-8">
              <Blog blogs={blog} />
              {/* <Comments />
              <CommentModal /> */}
            </div>
            <div class="col-lg-4 pt-3 pt-lg-0">
              <Tags keyword={blog && blog.keywords} />
              <Socialfollow />
              {/* <Newsletter /> */}
              {/* <div class="mb-3 pb-3">
                <a href="#!">
                  <img class="img-fluid" src="/img/news-500x280-2.jpg" alt="" />
                </a>
              </div> */}
              <Trending trending={trending} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default BlogDetail;
