import React, { useState } from "react";
import { Link } from "react-router-dom";
import resizeImg from "../functions/resizeImg";

const AllBlogs = ({ blog, adminPannel, fromAdmin }) => {
  // console.log(blog.activationRequest.slice(-1));
  // const borderColor = blog.activationRequest ? "green" : "red";
  // console.log(blog.activationRequest);
  let activationRequest = false;
  let date = null;
  if (
    (blog &&
      blog.activationRequest &&
      blog.activationRequest.slice(-1) === "1") ||
    blog.activationRequest.slice(-1) === "0"
  ) {
    activationRequest = blog.activationRequest.slice(-1) === "1" ? true : false;
    if (blog.activationRequest.slice(-1) === "1") {
      date = blog.activationRequest.slice(4, 24);
    }
  } else {
    activationRequest =
      blog && blog.activationRequet && blog.activationRequest === "true"
        ? true
        : false;
  }

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div class="" style={{ position: "relative" }}>
      <div
        class="d-flex mb-3"
        onClick={toggleExpand}
        style={{
          cursor: "pointer",
          borderRight: `4px solid ${activationRequest ? "green" : "red"}`,
        }}
      >
        <img
          src={resizeImg(blog.mainImg, 6, "h_150,c_scale")}
          // src={blog.mainImg}
          alt={blog.category}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
        <div
          class="w-100 d-flex flex-column justify-content-center bg-light px-3"
          style={{ height: "100px" }}
        >
          <div class="mb-1" style={{ fontSize: "13px" }}>
            {/* <Link to={"/blog/" + blog._id + "/" + blog.title} state={blog}> */}
            {blog.category}
            {/* </Link> */}
            <span class="px-1">/</span>
            <span>{blog.createdDate}</span>
            <span
              style={{
                float: "right",
                color: blog.status === "Active" ? "green" : "red",
              }}
            >
              {blog.status}
            </span>
          </div>
          {/* <Link
            to={"/blog/" + blog._id + "/" + blog.title}
            state={blog}
            class="h6 m-0 break-line-3"
          > */}
          <p class="h6 m-0 break-line-3">{blog.title}</p>

          {/* <a
            href={
              "https://www.offtheweb.in/blogs/preview/" +
              blog.title.toLowerCase().replace(/ /g, "-").replace(/\?/g, "") +
              "-" +
              blog.id
            }
            rel="noreferrer"
            target="_blank"
            style={{
              zIndex: "900px",
              textAlign: "end",
              color: "green",
            }}
          >
            {date && (
              <span style={{ float: "left" }}>
                <small>{date}</small>
              </span>
            )}
            preview
          </a> */}
          {/* {expanded ? "collapse" : "expand"} */}

          {/* </Link> */}
        </div>
      </div>

      <div
        className={`allblogs-more-data-wrapper ${
          expanded ? "allblogs-expanded" : ""
        } ${adminPannel && "allblogs-more-data-wrapper-rel"}`}
        // className=""
        // style={{
        //   position: adminPannel && "relative",
        // }}
      >
        <div className="allblogs-more-data">
          <div className="allblogs-more-data-inner">
            <small className="allblogs-flex-item">
              <b>Status:</b>{" "}
              <span
                style={{
                  color: blog.status === "Active" ? "green" : "red",
                }}
              >
                {blog.status}
              </span>
            </small>
            <small className="allblogs-flex-item">
              <b>Last Updated on:</b>{" "}
              {blog.updatedDate ? blog.updatedDate : "Not updated"}
            </small>

            <small className="allblogs-flex-item">
              <b>Activation Request:</b>{" "}
              <span
                style={{
                  color: activationRequest ? "green" : "red",
                }}
              >
                {activationRequest ? "Sent" : "Not Sent"}
              </span>
            </small>
            <small className="allblogs-flex-item">
              <b>Request Date:</b> {date ? date : "No data Available"}
            </small>
            <small className="allblogs-flex-item">
              <b>Activated By:</b>{" "}
              {blog.status === "Active"
                ? blog.activationDetails
                  ? blog.activationDetails.activatedBy
                  : "No data Available"
                : "Not Activated"}
            </small>
            <small className="allblogs-flex-item">
              <b>Activation Date:</b>{" "}
              {blog.status === "Active"
                ? blog.activationDetails
                  ? blog.activationDetails.activatedDate.slice(4, 24)
                  : "No data Available"
                : "Not Activated"}
            </small>
            <div className="allblogs-flex-item-last">
              {!adminPannel && (
                <Link
                  to="/edit"
                  state={{ ...blog, fromAdmin: fromAdmin }}
                  style={{ marginRight: "15px" }}
                  // onClick={updateForm}
                >
                  Edit Blog
                </Link>
                // <a
                //   href="#!"
                //   style={{ marginRight: "15px" }}
                //   onClick={updateForm}
                // >
                //   Edit Blog
                // </a>
              )}
              <a
                href={
                  "https://www.offtheweb.in/blogs/preview/" +
                  blog.title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/\?/g, "") +
                  "-" +
                  blog.id
                }
                rel="noreferrer"
                target="_blank"
                style={{
                  // zIndex: "900px",
                  marginRight: "10px",
                  // float: "right",
                  color: "green",
                }}
              >
                preview
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
