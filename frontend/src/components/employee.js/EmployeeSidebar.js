import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../../context";

const EmployeeSidebar = ({ data }) => {
  const { setEmployeeData } = useContext(globalContext);
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
    localStorage.removeItem("employeeToken");
    setEmployeeData(null);
    navigate("/", { replace: true });
  }
  // const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <div ref={bodyPd} id="body-pd">
        <header class="header" ref={header} id="header">
          <div onClick={showNavbar} class="header_toggle">
            <i class="bx bx-menu" ref={headerToggle} id="header-toggle"></i>
          </div>
          <div>
            {data && data.adminLevel <= 3 && (
              <Link className="btn btn-success" to="/admin">
                Admin
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
                <span class="nav_logo-name">Off The Web</span>{" "}
              </div>
              {/* <div class="nav_list">
                <Link onClick={() => setModalShow(true)} class="nav_link">
                  {" "}
                  <i class="bx bx-user-plus nav_icon"></i>{" "}
                  <span class="nav_name">Add Employee/Intern</span>{" "}
                </Link>{" "}
              </div> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
