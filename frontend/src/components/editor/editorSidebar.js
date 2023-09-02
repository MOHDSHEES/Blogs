import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../../context";
import MetaInput from "./metaInput";
// import Form from "./form";

const EditorSidebar = ({
  setMetaData,
  metaData,
  onClickEdit,
  updateFlag,
  isAdmin,
}) => {
  const { employeeData } = useContext(globalContext);
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

  let navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <div>
      <div ref={bodyPd} id="body-pd">
        <header class="header" ref={header} id="header">
          <div onClick={showNavbar} class="header_toggle">
            <i class="bx bx-menu" ref={headerToggle} id="header-toggle"></i>
          </div>

          <div>
            {/* {isAdmin && (
              <Link className="btn btn-success" to="/admin">
                Admin
              </Link>
            )} */}
            {employeeData ? (
              <Link
                // onClick={() => setExpanded(false)}
                to={"/employee/" + employeeData.employeeId}
                className="btn btn-success"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                // onClick={() => setExpanded(false)}
                to="/employee/login"
                className="btn btn-success"
              >
                Employee LogIn
              </Link>
            )}
            <button
              style={{ float: "right", marginLeft: "10px" }}
              className="btn btn-outline-primary"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </header>
        <div class="l-navbar" ref={Navbar} id="nav-bar">
          <nav class="nav">
            <div>
              {" "}
              <div class="nav_logo">
                {" "}
                <img
                  style={{ marginLeft: "-30px" }}
                  className="nav_logo-icon"
                  alt="OFFTHEWEB"
                  src="/logo.png"
                  height={70}
                />
                {/* <i class="bx bx-layer nav_logo-icon"></i>{" "} */}
                <span class="nav_logo-name">Off The Web</span>{" "}
              </div>
              <div class="nav_list">
                {!updateFlag && (
                  <Link
                    // onClick={onClickM}

                    class="nav_link"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <i class="bx bx-spreadsheet nav_icon"></i>
                    {/* <i class="bx bx-heading nav_icon"></i>{" "} */}
                    <span class="nav_name">Meta Data</span>{" "}
                  </Link>
                )}
                {/* <Link onClick={onClickP} class="nav_link active">
                  {" "}
                  <i class="bx bx-text nav_icon"></i>
                  <span class="nav_name">Paragraph</span>{" "}
                </Link> */}
                {/* <Link
                  style={{ paddingLeft: "0.8rem" }}
                  onClick={onClickIT}
                  class="nav_link"
                >
                 
                  <span>
                   
                    <i class="bx bx-image-alt nav_icon"></i>
                    <i class="bx bx-horizontal-left nav_icon"></i>
                  </span>
                 
                  <span class="nav_name">Image on Left</span>
                </Link> */}
                {/* <Link
                  style={{ paddingLeft: "0.6rem" }}
                  onClick={onClickTI}
                  class="nav_link"
                >
                  <span>
                    <i class="bx bx-horizontal-right nav_icon"></i>
                    <i class="bx bx-image-alt nav_icon"></i>
                  </span>
                
                  <span class="nav_name">Image on Right</span>
                </Link> */}
                {/* <Link onClick={onClickTW} class="nav_link">
                  <i class="bx bxl-twitter nav_icon"></i>
                  <span class="nav_name">Twitter Tweet</span>
                </Link> */}
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
            <div>
              <Link onClick={onClickEdit} class="nav_link">
                {" "}
                <i class="bx bx-edit-alt nav_icon"></i>{" "}
                <span class="nav_name">Edit</span>{" "}
              </Link>
            </div>
          </nav>
        </div>
        {/* <div class="height-100 bg-light">
          <Form />
        </div> */}
      </div>
      <MetaInput setMetaData={setMetaData} metaData={metaData} />
    </div>
  );
};

export default EditorSidebar;
