import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Blog = ({ blogs }) => {
  const [blog, setblog] = useState(null);
  useEffect(() => {
    setblog(blogs);
  }, [blogs]);
  // const navigate = useNavigate();
  // const { state } = useLocation();
  // // console.log(state);
  // const { id } = useParams();
  // // console.log(id);
  // const [blog, setblog] = useState(null);
  // // console.log(blog);
  // useEffect(() => {
  //   if (state && Object.keys(state).length !== 0) setblog(state);
  //   (async () => {
  //     const { data } = await axios.post("/api/find/blog/id", {
  //       id: id,
  //     });
  //     // console.log(data);
  //     if (data && data._id) setblog(data);
  //     else {
  //       navigate("/");
  //     }
  //   })();
  // }, [state, id, navigate]);

  return (
    <div>
      <div class="position-relative mb-3">
        {!(blog && blog.mainImg) ? (
          <Skeleton
            baseColor="#cdcbcb"
            highlightColor="#e6e5e5"
            // width={window.screen.width < 775 ? 280 : 490}
            height={400}
            duration={2}
          />
        ) : (
          <img
            class="img-fluid w-100"
            src={blog && blog.mainImg}
            alt=""
            style={{ objectFit: "cover" }}
          />
        )}
        <div class="overlay position-relative bg-light">
          <div class="mb-3">
            <a href="#!">{blog && blog.category}</a>
            <span class="px-1">/</span>
            <span>{blog && blog.createdDate} / </span>
            <span>Total Views: {blog && blog.views}</span>
          </div>
          {/* <div class="mb-3">
            {blog &&
              blog.keywords
                .split(",")
                .slice(0, 3)
                .map((str) => {
                  return (
                    <span class="btn btn-sm btn-outline-secondary m-1">
                      {str}
                    </span>
                  );
                })}
          </div> */}
          <div>
            <h3 class="mb-3">{blog && blog.title}</h3>
            {blog &&
              blog.blog &&
              blog.blog.map((bl) => {
                return (
                  <div>
                    {bl.tag === "P" ? (
                      bl.text.split("\n").map((str) => (
                        <p
                          style={{
                            // whiteSpace: "break-spaces",
                            textAlign: "justify",
                          }}
                          // dangerouslySetInnerHTML={{ __html: str }}
                        >
                          {parse(str)}
                        </p>
                      ))
                    ) : // <p>{bl.text}</p>
                    bl.tag === "IT" ? (
                      <>
                        {" "}
                        <img
                          class="img-fluid w-50 float-left mr-4 mb-2"
                          src={bl.img}
                          alt={bl.img}
                        />
                        {bl.text.split("\n").map((str) => (
                          <p
                            style={{
                              // whiteSpace: "break-spaces",
                              textAlign: "justify",
                            }}
                          >
                            {parse(str)}
                          </p>
                        ))}
                        {/* <p>{bl.text}</p> */}
                      </>
                    ) : bl.tag === "TI" ? (
                      <>
                        {" "}
                        <img
                          class="img-fluid w-50 float-right ml-4 mb-2"
                          src={bl.img}
                          alt={bl.img}
                        />
                        {bl.text.split("\n").map((str) => (
                          <p
                            style={{
                              // whiteSpace: "break-spaces",
                              textAlign: "justify",
                            }}
                          >
                            {parse(str)}
                          </p>
                        ))}
                      </>
                    ) : (
                      bl.tag === "H" && (
                        <h4 style={{ whiteSpace: "break-spaces" }} class="mb-3">
                          {parse(bl.text)}
                        </h4>
                      )
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
