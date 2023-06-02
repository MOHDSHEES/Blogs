import React, { useEffect, useState } from "react";
import Form from "./components/blogAdd/form";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import BlogDetail from "./components/blog/singleBlog/blogDetail";
import Homepage from "./components/homepage/homepage";
import CompleteNavbarAndFooter from "./components/completeNavbarAndFooter";
import axios from "axios";
import CategoryPage from "./components/categoryPageComponents/categoryPage";
import Contactform from "./components/contactComponent/contactform";
import MoreCategoriesPage from "./components/categoryPageComponents/moreCategoriesPage";
import Terms from "./components/terms";
import Advertise from "./components/advertise/advertise";
import PrivacyPolicy from "./components/privacyPolicy";
import { Analytics } from "@vercel/analytics/react";
import Career from "./components/career/career";
import Signup from "./components/login/signup";
import Login from "./components/login/login";
import { message } from "antd";
import ProtectedRoute from "./components/functions/protectedRoute";
import Admin from "./components/admin/admin";
import { staticCategories } from "./data";

// import Sidebar from "./components/sidebar";

function App() {
  const [trending, settrending] = useState(null);
  // const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!trending) {
      (async () => {
        // setloading(true);
        const { data } = await axios.post("/api/blog/trending");
        // console.log(data);
        if (data && data.length) settrending(data);
        // setloading(false);
      })();
    }
  }, [trending]);

  // finding categories
  const [categories, setcategories] = useState(staticCategories);
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post("/api/find/categories");
      // console.log(data);
      if (data && data.length) setcategories(data);
      // setloading(false);
    })();
  }, []);

  const [recentBlogs, setrecentBlogs] = useState(null);

  // const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!recentBlogs) {
      (async () => {
        // setloading(true);
        const { data } = await axios.post("/api/recent/blogs");
        // console.log(data);
        if (data && data.length) setrecentBlogs(data);
        // setloading(false);
      })();
    }
  }, [recentBlogs]);

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);
    return null;
  }
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div>
      {/* <Form /> */}
      <ScrollToTop />
      {contextHolder}
      <Routes>
        <Route
          path="/"
          element={
            <CompleteNavbarAndFooter cate={categories} trend={trending} />
          }
        >
          <Route
            path="/"
            element={
              <Homepage
                recent={recentBlogs}
                trend={trending}
                cate={categories}
              />
            }
          />
          <Route path="/signup" element={<Signup message={messageApi} />} />
          <Route path="/login" element={<Login message={messageApi} />} />
          <Route path="/blog/:id/:title" element={<BlogDetail />} />
          <Route path="/blogs/:category" element={<CategoryPage />} />
          <Route path="/contact" element={<Contactform />} />
          <Route path="/terms/condition" element={<Terms />} />
          <Route path="/privacy/policies" element={<PrivacyPolicy />} />
          <Route path="/advertise/policies" element={<Advertise />} />
          <Route
            path="/categories"
            element={<MoreCategoriesPage cate={categories} />}
          />
          <Route path="/career" element={<Career />} />
        </Route>
        {/* <Route path="/add" element={<Form cate={categories} />} />
        <ProtectedRoute path="/add" categories={categories} /> */}
        <Route path="/add" element={<ProtectedRoute />}>
          <Route path="/add" element={<Form cate={categories} />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        {/* <Route path="/add" element={<ProtectedRoute />} /> */}
        {/* <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/add" element={<Form />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
