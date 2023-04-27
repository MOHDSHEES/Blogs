import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ category }) => {
  // const [Category, setCategory] = useState(null);
  // useEffect(() => {
  //   setCategory(category);
  // }, [category]);
  return (
    <div>
      <div style={{ padding: "1rem 15px" }} class="container-fluid">
        <div style={{ padding: "0" }} class="container">
          <nav class="breadcrumb bg-transparent m-0 p-0">
            <Link class="breadcrumb-item a" to="/">
              Home
            </Link>
            <Link class="breadcrumb-item a" to="/categories">
              Category
            </Link>
            <Link class="breadcrumb-item a" to={"/blogs/" + category}>
              {category}
            </Link>
            {/* <span class="breadcrumb-item">{category}</span> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
