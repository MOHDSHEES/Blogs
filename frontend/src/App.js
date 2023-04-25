import React, { useEffect } from "react";
import Form from "./components/form";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import BlogDetail from "./components/blog/singleBlog/blogDetail";
import Homepage from "./components/homepage/homepage";
import CompleteNavbarAndFooter from "./components/completeNavbarAndFooter";

// import Sidebar from "./components/sidebar";

function App() {
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
        <Route path="/" element={<CompleteNavbarAndFooter />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Route>
        <Route path="/add" element={<Form />} />
        {/* <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/add" element={<Form />} /> */}
      </Routes>
    </div>
  );
}

export default App;
