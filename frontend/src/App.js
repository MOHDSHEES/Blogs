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
import ChangePassword from "./components/login/changePassword";
import { globalContext } from "./context";
import EmployeeRegister from "./components/login/employeeRegister";
import PrintCertificate from "./components/printCertificate";
import Employee from "./components/employee.js/employee";
import EmployeeLogin from "./components/login/employeeLogin";
import TextEditor from "./components/editor/textEditor";
import Test from "./components/test";

// import Sidebar from "./components/sidebar";

function App() {
  const [trending, settrending] = useState(null);
  // const [loading, setloading] = useState(false);

  const [recentBlogs, setrecentBlogs] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  // const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!(recentBlogs && categoryData)) {
      (async () => {
        // setloading(true);
        const { data } = await axios.post("/api/find/data/homepage");
        if (data) {
          setrecentBlogs(data.recent);
          setCategoryData(data.categoryData);
        }
      })();
    }
  }, [recentBlogs, categoryData]);

  const [titles, setTitles] = useState([]);
  useEffect(() => {
    if (titles.length === 0) {
      async function blogTitles() {
        const { data } = await axios.post("/api/blog/titles");
        setTitles(data);
      }
      if (titles.length === 0) {
        blogTitles();
      }
    }
  }, [titles.length]);

  // trending blogs
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
    if (recentBlogs && trending) {
      (async () => {
        // setloading(true);
        const { data } = await axios.post("/api/find/categories");
        // console.log(data);
        if (data && data.length) setcategories(data);
        // setloading(false);
      })();
    }
  }, [recentBlogs, trending]);

  const [employeeData, setEmployeeData] = useState(null);
  // verify employee login
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/authenticate/employee", {
        token: localStorage.getItem("employeeToken"),
      });
      if (data.status === 200) {
        setEmployeeData(data.user);
      } else {
        setEmployeeData(null);
      }
    })();
  }, []);

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
      <globalContext.Provider
        value={{
          trending,
          categories,
          recentBlogs,
          titles,
          messageApi,
          employeeData,
          setEmployeeData,
        }}
      >
        {contextHolder}
        <Routes>
          <Route path="/" element={<CompleteNavbarAndFooter />}>
            {/* <Route
              path="/print"
              element={<PrintCertificate message={messageApi} />}
            /> */}
            <Route
              path="/"
              element={<Homepage categoryData={categoryData} />}
            />
            <Route path="/signup" element={<Signup message={messageApi} />} />
            <Route path="/login" element={<Login message={messageApi} />} />
            <Route
              path="/employee/login"
              element={<EmployeeLogin message={messageApi} />}
            />

            <Route
              path="/employee/registration/:token"
              element={<EmployeeRegister message={messageApi} />}
            />
            <Route
              path="/changepassword/:token"
              element={<ChangePassword message={messageApi} employee={false} />}
            />
            <Route
              path="/employee/changepassword/:token"
              element={<ChangePassword message={messageApi} employee={true} />}
            />
            <Route path="/blog/:id/:title" element={<BlogDetail />} />
            <Route path="/blogs/:category" element={<CategoryPage />} />
            {/* <Route path="/contact" element={<Contactform />} /> */}
            {/* <Route path="/terms/condition" element={<Terms />} /> */}
            {/* <Route path="/privacy/policies" element={<PrivacyPolicy />} /> */}
            {/* <Route path="/advertise/policies" element={<Advertise />} /> */}
            <Route path="/categories" element={<MoreCategoriesPage />} />
            {/* <Route path="/career" element={<Career />} /> */}
            {/* <Route path="/test" element={<Test />} /> */}
          </Route>
          {/* <Route path="/add" element={<Form cate={categories} />} />
        <ProtectedRoute path="/add" categories={categories} /> */}
          {/* <Route path="/edit" element={<TextEditor />} /> */}
          <Route path="/add" element={<ProtectedRoute />}>
            <Route path="/add" element={<Form />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route
            path="/employee/:id"
            element={<Employee message={messageApi} />}
          />

          {/* <Route path="/add" element={<ProtectedRoute />} /> */}
          {/* <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/add" element={<Form />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Analytics />
      </globalContext.Provider>
    </div>
  );
}

export default App;
