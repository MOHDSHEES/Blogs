import React, { useEffect, useState } from "react";
import Autocomplete from "../autocomplete/autocomplete";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

const NavBar = ({ searchHandler }) => {
  function searchHandle(e, search) {
    e.preventDefault();
    // console.log(search);
    searchHandler(search);
    setExpanded(false);
  }
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    async function editBlog() {
      const { data } = await axios.post("/api/blog/titles");
      setTitles(data);
    }
    if (titles.length === 0) {
      editBlog();
    }
  }, []);

  const [titles, setTitles] = useState([]);
  return (
    <div>
      <div class="container-fluid p-0 mb-3">
        {/* {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => ( */}
        <Navbar
          expanded={expanded}
          // key={expand}
          expand="lg"
          bg="light"
          className="py-2 py-lg-0 px-lg-5"
        >
          <Container fluid>
            <Navbar.Brand className="navbar-brand d-block d-lg-none" href="#">
              {" "}
              <Link to="/">
                <h2 style={{ fontWeight: "600" }} class="m-0  text-uppercase">
                  <span class="text-primary">OFF</span>THE
                  <span class="text-primary">WEB</span>
                </h2>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              onClick={() => setExpanded(expanded ? false : "expanded")}
              aria-controls={`offcanvasNavbar-expand-lg`}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              onHide={() => setExpanded(false)}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  OFFTHEWEB
                </Offcanvas.Title>
                {/* <button
                  type="button"
                  class="btn-close text-reset new_close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button> */}
              </Offcanvas.Header>
              {/* <Navbar.Collapse id="navbarScroll"> */}
              <Offcanvas.Body className="align-items-center">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  // style={{ maxHeight: "100px" }}
                  // navbarScroll
                >
                  <Nav.Link className="nav-item  active" href="/">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#action3" className="nav-item ">
                    Categories
                  </Nav.Link>
                  <Nav.Link href="#action4" className="nav-item ">
                    Single Blog
                  </Nav.Link>
                  <Nav.Link href="#" class="nav-item ">
                    Contact
                  </Nav.Link>

                  <NavDropdown title="Dropdown" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      Dropdown
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Form className="d-flex"> */}
                <Autocomplete
                  searchHandler={searchHandle}
                  suggestions={titles}
                />
                {/* <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button> */}
                {/* </Form> */}
                {/* </Navbar.Collapse> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        {/* ))} */}
      </div>
    </div>
  );
};

export default NavBar;
