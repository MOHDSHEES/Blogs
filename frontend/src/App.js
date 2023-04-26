import React, { useEffect, useState } from "react";
import Form from "./components/form";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import BlogDetail from "./components/blog/singleBlog/blogDetail";
import Homepage from "./components/homepage/homepage";
import CompleteNavbarAndFooter from "./components/completeNavbarAndFooter";
import axios from "axios";

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
        <Route path="/" element={<CompleteNavbarAndFooter trend={trending} />}>
          <Route path="/" element={<Homepage trend={trending} />} />
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
