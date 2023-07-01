import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../../context";

const Footer = () => {
  const { categories: cate } = useContext(globalContext);
  const [categories, setcategories] = useState(null);
  useEffect(() => {
    setcategories(cate);
  }, [cate]);
  return (
    <div>
      <div class="container-fluid bg-light pt-5 px-sm-3 px-md-5">
        <div class="row justify-content-between">
          <div class="col-lg-3 col-md-6 mb-5">
            <Link to="/" class="navbar-brand">
              <h2 class="mb-2 mt-n2  text-uppercase">
                <span class="text-primary">OFF</span>THE
                <span class="text-primary">WEB</span>
              </h2>
            </Link>
            <p>
              Stay ahead of the curve with OFFTHEWEB - your source for the
              latest in tech and beyond.
            </p>
            <div class="d-flex justify-content-start mt-4">
              <a
                class="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: "38px", height: "38px" }}
                href="https://twitter.com/_OFFTHEWEB"
              >
                <i class="bx bxl-twitter"></i>
              </a>
              {/* <a
                class="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: "38px", height: "38px" }}
                href="#!"
              >
                <i class="bx bxl-facebook"></i>
              </a> */}
              <a
                class="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: "38px", height: "38px" }}
                href="https://www.linkedin.com/company/offtheweb/"
              >
                <i class="bx bxl-linkedin"></i>
              </a>
              <a
                class="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: "38px", height: "38px" }}
                href="https://www.instagram.com/_offtheweb/"
              >
                <i class="bx bxl-instagram"></i>
              </a>
              <a
                class="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: "38px", height: "38px" }}
                href="https://www.youtube.com/channel/UC0BxUqApESxQZ49REib5ELQ"
              >
                <i class="bx bxl-youtube"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-5">
            <h4 class="font-weight-bold mb-4">Categories</h4>
            <div class="d-flex flex-wrap m-n1">
              {categories &&
                categories.map((category, idx) => {
                  return (
                    <Link
                      key={idx}
                      to={"/blogs/" + category.category}
                      class="btn btn-sm btn-outline-secondary m-1"
                    >
                      {category.category}
                    </Link>
                  );
                })}
              {/* <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Politics
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Business
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Corporate
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Sports
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Health
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Education
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Science
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Technology
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Foods
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Entertainment
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Travel
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Lifestyle
              </a> */}
            </div>
          </div>
          {/* <div class="col-lg-3 col-md-6 mb-5">
            <h4 class="font-weight-bold mb-4">Tags</h4>
            <div class="d-flex flex-wrap m-n1">
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Politics
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Business
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Corporate
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Sports
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Health
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Education
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Science
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Technology
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Foods
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Entertainment
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Travel
              </a>
              <a href="#!" class="btn btn-sm btn-outline-secondary m-1">
                Lifestyle
              </a>
            </div>
          </div> */}
          <div class="col-lg-3 col-md-6 mb-5">
            <h4 class="font-weight-bold mb-4">Quick Links</h4>
            <div class="d-flex flex-column justify-content-start">
              {/* <a class="text-secondary mb-2" href="#!">
                <i class="fa fa-angle-right text-dark mr-2"></i>About
              </a> */}
              <a
                class="text-secondary mb-2"
                href="https://www.offtheweb.in/policies/advertise"
              >
                <i class="fa fa-angle-right text-dark mr-2"></i>Advertise
              </a>
              <a
                class="text-secondary mb-2"
                href="https://www.offtheweb.in/policies/privacyPolicy"
              >
                <i class="fa fa-angle-right text-dark mr-2"></i>Privacy & policy
              </a>
              <a
                class="text-secondary mb-2"
                href="https://www.offtheweb.in/policies/termsCondition"
              >
                <i class="fa fa-angle-right text-dark mr-2"></i>Terms &
                conditions
              </a>
              <Link class="text-secondary mb-2" to="/contact">
                <i class="fa fa-angle-right text-dark mr-2"></i>Contact
              </Link>
              <Link class="text-secondary mb-2" to="/add">
                <i class="fa fa-angle-right text-dark mr-2"></i>Add Blog
              </Link>
              <a class="text-secondary" href="https://www.offtheweb.in/career">
                <i class="fa fa-angle-right text-dark mr-2"></i>Careers
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "0.1rem solid #ebebeb" }}>
          {/* <hr /> */}
          <p style={{ textAlign: "center", margin: 0, padding: "10px" }}>
            Copyright © 2023 OFFTHEWEB. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
