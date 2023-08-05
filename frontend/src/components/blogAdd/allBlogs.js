import React from "react";
import resizeImg from "../functions/resizeImg";

const AllBlogs = ({ blog }) => {
  // console.log(blog.activationRequest.slice(-1));
  // const borderColor = blog.activationRequest ? "green" : "red";
  // console.log(blog.activationRequest);
  let borderColor;
  let date = null;
  if (
    (blog.activationRequest && blog.activationRequest.slice(-1) === "1") ||
    blog.activationRequest.slice(-1) === "0"
  ) {
    borderColor = blog.activationRequest.slice(-1) === "1" ? "green" : "red";
    if (blog.activationRequest.slice(-1) === "1") {
      date = blog.activationRequest.slice(4, 21);
    }
  } else {
    borderColor = blog.activationRequest === "true" ? "green" : "red";
  }

  return (
    // <div class="col-lg-6">
    <div
      class="d-flex mb-3"
      style={{ borderRight: `4px solid ${borderColor}` }}
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

        <a
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
        </a>

        {/* </Link> */}
      </div>
    </div>
    // </div>
  );
};

export default AllBlogs;
