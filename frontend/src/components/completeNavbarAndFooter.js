import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/navbar";
import Topbar from "./navbar/topbar";
import { useNavigate } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
import { message } from "antd";
import axios from "axios";
import { closeMessage } from "./functions/message";
import Footer from "./footer/footer";
const CompleteNavbarAndFooter = ({ trend, cate }) => {
  const [messageApi, contextHolder] = message.useMessage();
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
      navigate("/blog/" + data[0]._id + "/" + data[0].title, {
        state: blog,
      });
    } else {
      closeMessage(
        messageApi,
        "Oops! Blog not found. Try searching another keyword.",
        "error"
      );
      // setShow(true);
    }
  }
  // console.log(trend);
  return (
    <div>
      {contextHolder}
      <Topbar trend={trend} />
      <NavBar searchHandler={searchHandler} />
      <Outlet />
      <Footer cate={cate} />
    </div>
  );
};

export default CompleteNavbarAndFooter;
