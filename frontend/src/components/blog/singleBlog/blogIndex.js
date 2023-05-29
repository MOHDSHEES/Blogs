import React from "react";
import { Link } from "react-router-dom";

const BlogIndex = ({ blog }) => {
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // console.log(blog);
  return (
    <div className="blog-index mb-3">
      <div style={{ textAlign: "center" }}>
        <h5 style={{ color: "#ed1c24" }}>Index</h5>
      </div>
      <ul style={{ paddingLeft: "24px" }}>
        <li className="index-ul">
          <Link
            onClick={() => handleClickScroll(blog.title)}
            //   href={"#" + blog.text}
            className="text-secondary mb-2 "
          >
            Introduction
          </Link>
        </li>
        {blog &&
          blog.blog &&
          blog.blog.map((blog) => {
            return (
              <>
                {blog.tag === "H" && (
                  <li className="index-ul">
                    <Link
                      onClick={() => handleClickScroll(blog.text)}
                      //   href={"#" + blog.text}
                      className="text-secondary mb-2 "
                    >
                      {" "}
                      {blog.text}
                    </Link>
                  </li>
                )}
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogIndex;
