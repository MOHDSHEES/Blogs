import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import Form from "./form";

const Sidebar = ({ onClickH, onClickIT, onClickP, onClickTI, onClickEdit }) => {
  useEffect(() => {
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));
  }, []);
  const headerToggle = useRef();
  const Navbar = useRef();
  const bodyPd = useRef();
  const header = useRef();
  function showNavbar() {
    // show navbar
    Navbar.current.classList.toggle("showsidebar");
    // change icon
    headerToggle.current.classList.toggle("bx-x");
    // add padding to body
    bodyPd.current.classList.toggle("body-pd");
    // add padding to header
    header.current.classList.toggle("body-pd");
  }
  return (
    <div>
      <div ref={bodyPd} id="body-pd">
        <header class="header" ref={header} id="header">
          <div onClick={showNavbar} class="header_toggle">
            <i class="bx bx-menu" ref={headerToggle} id="header-toggle"></i>
          </div>
        </header>
        <div class="l-navbar" ref={Navbar} id="nav-bar">
          <nav class="nav">
            <div>
              {" "}
              <Link to="/" class="nav_logo">
                {" "}
                <i class="bx bx-layer nav_logo-icon"></i>{" "}
                <span class="nav_logo-name">Off The Web</span>{" "}
              </Link>
              <div class="nav_list">
                <Link onClick={onClickH} class="nav_link">
                  {" "}
                  <i class="bx bx-heading nav_icon"></i>{" "}
                  <span class="nav_name">Heading</span>{" "}
                </Link>{" "}
                <Link onClick={onClickP} class="nav_link active">
                  {" "}
                  <i class="bx bx-text nav_icon"></i>
                  {/* <i class="bx bx-grid-alt nav_icon"></i>{" "} */}
                  <span class="nav_name">Paragraph</span>{" "}
                </Link>{" "}
                <Link
                  style={{ paddingLeft: "0.8rem" }}
                  onClick={onClickIT}
                  class="nav_link"
                >
                  {" "}
                  <span>
                    {" "}
                    <i class="bx bx-image-alt nav_icon"></i>
                    <i class="bx bx-horizontal-left nav_icon"></i>
                  </span>
                  {/* <i class="bx bx-user nav_icon"></i>{" "} */}
                  <span class="nav_name">Image on Left</span>{" "}
                </Link>{" "}
                <Link
                  style={{ paddingLeft: "0.6rem" }}
                  onClick={onClickTI}
                  class="nav_link"
                >
                  <span>
                    <i class="bx bx-horizontal-right nav_icon"></i>
                    <i class="bx bx-image-alt nav_icon"></i>
                  </span>
                  {/* <i class="bx bx-message-square-detail nav_icon"></i>{" "} */}
                  <span class="nav_name">Image on Right</span>{" "}
                </Link>{" "}
                {/* <Link class="nav_link">
                  <i class="bx bx-image-alt nav_icon"></i>
                  <span class="nav_name">Image</span>
                </Link>
                <Link  class="nav_link">
                  
                  <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
                  <span class="nav_name">Stats</span>
                </Link> */}
              </div>
            </div>{" "}
            <Link onClick={onClickEdit} class="nav_link">
              {" "}
              <i class="bx bx-edit-alt nav_icon"></i>{" "}
              <span class="nav_name">Edit</span>{" "}
            </Link>
          </nav>
        </div>
        {/* <div class="height-100 bg-light">
          <Form />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
