import React from "react";
import { useEffect } from "react";
import PendingTable from "./pendingTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/authenticate", {
        token: localStorage.getItem("token"),
      });
      console.log(data);
      if (!(data.status === 200 && data.user.isAdmin)) {
        navigate("/");
      }
    })();
  }, [navigate]);
  return (
    <div style={{ padding: "1rem 15px" }} class="container-fluid ">
      <div style={{ padding: "0" }} class="container">
        <div class="row">
          <div class="col-lg-4 pt-3 pt-lg-0"></div>
          <div class="col-lg-8">
            <PendingTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
