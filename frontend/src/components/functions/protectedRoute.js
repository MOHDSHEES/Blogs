import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import Form from "../blogAdd/form";

// const verifyToken = () => {
//   const token = localStorage.getItem("token");
//   console.log(token);
//   //   var decoded = jwt.verify(token, process.env.JWT_SECRET);
//   return token;
//   //   return decoded;
// };
// console.log(verifyToken());
const ProtectedRoute = ({ token }) => {
  //   console.log(localStorage.getItem("token"))
  return localStorage.getItem(token) ? (
    // <Route {...rest} />
    <Outlet />
  ) : (
    // <Route {...rest} element={<Form cate={categories} />} />
    <Navigate to="/login" />
  );
  // <Route {...rest} element={<Form cate={categories} />} />
};

export default ProtectedRoute;
