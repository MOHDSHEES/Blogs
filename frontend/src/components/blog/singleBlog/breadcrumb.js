import React from "react";

const Breadcrumb = () => {
  return (
    <div>
      <div class="container-fluid">
        <div class="container">
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
            <span class="breadcrumb-item">News Title</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
