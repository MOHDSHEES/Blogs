import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import resizeImg from "../functions/resizeImg";
import CategoryPageSkeleton from "../skeleton/categoryPageSkeleton";
import parse from "html-react-parser";

const Categories = ({ blog }) => {
  const [blogs, setblogs] = useState(null);
  useEffect(() => {
    setblogs(blog);
  }, [blog]);
  return (
    <div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
            <h3 class="m-0">{!blogs ? "Loading..." : blogs[0].category}</h3>
            {/* <a
              class="text-secondary font-weight-medium text-decoration-none"
              href=""
            >
              View All
            </a> */}
          </div>
        </div>

        {!blogs
          ? [0, 1].map((c) => {
              return <CategoryPageSkeleton key={c} />;
            })
          : blogs.reverse().map((blog, idx) => {
              return (
                <div key={blog.category + idx} class="col-lg-6">
                  <div class="position-relative mb-3">
                    <img
                      class="img-fluid w-100"
                      src={resizeImg(blog.mainImg, 6, "h_250,c_scale")}
                      // src={blog.mainImg}
                      alt={blog.category}
                      style={{ objectFit: "cover", height: "250px" }}
                    />
                    <div class="overlay position-relative bg-light">
                      <div class="mb-2" style={{ fontSize: "14px" }}>
                        <Link
                          to={
                            "/blog/" +
                            blog._id +
                            "/" +
                            blog.title.replace(/ /g, "-")
                          }
                          state={blog}
                        >
                          {blog.category}
                        </Link>
                        <span class="px-1">/</span>
                        <span>{blog.createdDate}</span>
                      </div>
                      <Link
                        to={
                          "/blog/" +
                          blog._id +
                          "/" +
                          blog.title.replace(/ /g, "-")
                        }
                        state={blog}
                        class="h4"
                      >
                        {blog.title}
                      </Link>
                      <Link
                        to={
                          "/blog/" +
                          blog._id +
                          "/" +
                          blog.title.replace(/ /g, "-")
                        }
                        state={blog}
                        style={{ color: "#6c757d" }}
                        class="h6 m-0 break-line-3"
                      >
                        {parse(blog.blog[0].text)}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        {/* 
        <div class="col-lg-6">
          <div class="position-relative mb-3">
            <img
              class="img-fluid w-100"
              src="img/news-500x280-2.jpg"
              style={{ objectFit: "cover" }}
            />
            <div class="overlay position-relative bg-light">
              <div class="mb-2" style={{ fontSize: "14px" }}>
                <a href="">Technology</a>
                <span class="px-1">/</span>
                <span>January 01, 2045</span>
              </div>
              <a class="h4" href="">
                Est stet amet ipsum stet clita rebum duo
              </a>
              <p class="m-0">
                Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum,
                clita at justo, lorem amet vero eos sed sit...
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="position-relative mb-3">
            <img
              class="img-fluid w-100"
              src="img/news-500x280-3.jpg"
              style={{ objectFit: "cover" }}
            />
            <div class="overlay position-relative bg-light">
              <div class="mb-2" style={{ fontSize: "14px" }}>
                <a href="">Technology</a>
                <span class="px-1">/</span>
                <span>January 01, 2045</span>
              </div>
              <a class="h4" href="">
                Est stet amet ipsum stet clita rebum duo
              </a>
              <p class="m-0">
                Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum,
                clita at justo, lorem amet vero eos sed sit...
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="position-relative mb-3">
            <img
              class="img-fluid w-100"
              src="img/news-500x280-5.jpg"
              style={{ objectFit: "cover" }}
            />
            <div class="overlay position-relative bg-light">
              <div class="mb-2" style={{ fontSize: "14px" }}>
                <a href="">Technology</a>
                <span class="px-1">/</span>
                <span>January 01, 2045</span>
              </div>
              <a class="h4" href="">
                Est stet amet ipsum stet clita rebum duo
              </a>
              <p class="m-0">
                Rebum dolore duo et vero ipsum clita, est ea sed duo diam ipsum,
                clita at justo, lorem amet vero eos sed sit...
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
