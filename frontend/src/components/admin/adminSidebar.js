import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddEmployee from "./addEmployee";

const AdminSidebar = ({ setTab, adminLevel }) => {
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
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <div ref={bodyPd} id="body-pd">
        <header class="header" ref={header} id="header">
          <div onClick={showNavbar} class="header_toggle">
            <i class="bx bx-menu" ref={headerToggle} id="header-toggle"></i>
          </div>

          <div>
            <Link className="btn btn-success" to="/edit">
              Add Blog
            </Link>

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
                <Link onClick={() => setTab(0)} class="nav_link">
                  {" "}
                  <i class="bx bxs-badge-check nav_icon"></i>
                  {/* <i class="bx bx-heading "></i> */}
                  <span class="nav_name">Inactive Blogs</span>{" "}
                </Link>{" "}
              </div>
              {adminLevel && adminLevel === 1 && (
                <div class="nav_list">
                  <Link onClick={() => setModalShow(true)} class="nav_link">
                    {" "}
                    <i class="bx bx-user-plus nav_icon"></i>{" "}
                    {/* <i class="bx bx-heading "></i> */}
                    <span class="nav_name">Add Employee/Intern</span>{" "}
                  </Link>{" "}
                </div>
              )}
              <div class="nav_list">
                <Link onClick={() => setTab(1)} class="nav_link">
                  {" "}
                  <i class="bx bxs-user-detail nav_icon"></i>
                  {/* <i class="bx bx-heading "></i> */}
                  <span class="nav_name">Assign Task</span>{" "}
                </Link>{" "}
              </div>
              <div class="nav_list">
                <Link onClick={() => setTab(2)} class="nav_link">
                  {" "}
                  <i class="bx bx-task nav_icon"></i>
                  <span class="nav_name">All Blogs</span>{" "}
                </Link>{" "}
              </div>
            </div>{" "}
            {/* <div>
              <Link onClick={onClickEdit} class="nav_link">
                {" "}
                <i class="bx bx-edit-alt nav_icon"></i>{" "}
                <span class="nav_name">Edit</span>{" "}
              </Link>
            </div> */}
          </nav>
        </div>
        <AddEmployee show={modalShow} onHide={() => setModalShow(false)} />
        {/* <div class="height-100 bg-light">
          <Form />
        </div> */}
      </div>
    </div>
  );
};

export default AdminSidebar;
