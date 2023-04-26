import React, { useEffect, useState } from "react";
import Form from "./components/blogAdd/form";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import BlogDetail from "./components/blog/singleBlog/blogDetail";
import Homepage from "./components/homepage/homepage";
import CompleteNavbarAndFooter from "./components/completeNavbarAndFooter";
import axios from "axios";
import CategoryPage from "./components/categoryPageComponents/categoryPage";

// import Sidebar from "./components/sidebar";

function App() {
  const [trending, settrending] = useState(null);
  // const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post("/api/blog/trending");
      // console.log(data);
      if (data && data.length) settrending(data);
      // setloading(false);
    })();
  }, []);

  // finding categories
  const [categories, setcategories] = useState(null);
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post("/api/find/categories");
      // console.log(data);
      if (data && data.length) setcategories(data);
      // setloading(false);
    })();
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  return (
    <div>
      {/* <Form /> */}
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <CompleteNavbarAndFooter cate={categories} trend={trending} />
          }
        >
          <Route
            path="/"
            element={<Homepage trend={trending} cate={categories} />}
          />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blogs/:category" element={<CategoryPage />} />
        </Route>
        <Route path="/add" element={<Form cate={categories} />} />
        {/* <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/add" element={<Form />} /> */}
      </Routes>
    </div>
  );
}

export default App;
