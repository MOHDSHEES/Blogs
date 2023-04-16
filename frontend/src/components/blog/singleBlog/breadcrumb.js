import React from "react";

const Breadcrumb = () => {
  return (
    <div>
      <div style={{ padding: "1rem 15px" }} class="container-fluid">
        <div style={{ padding: "0" }} class="container">
          <nav class="breadcrumb bg-transparent m-0 p-0">
            <a class="breadcrumb-item a" href="#!">
              Home
            </a>
            <a class="breadcrumb-item a" href="#!">
              Category
            </a>
            <a class="breadcrumb-item a" href="#!">
              Technology
            </a>
            {/* <span class="breadcrumb-item">News Title</span> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
