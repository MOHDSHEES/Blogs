import React from "react";
import { useEffect } from "react";
import PendingTable from "./pendingTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./adminSidebar";
import { useState } from "react";

const Admin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/authenticate", {
        token: localStorage.getItem("token"),
      });
      //   console.log(data);
      if (!(data.status === 200 && data.user.isAdmin)) {
        navigate("/");
      } else if (data.status === 200 && data.user.isAdmin) {
        setAdmin(true);
      }
    })();
  }, [navigate]);
  return (
    <div className="body">
      <AdminSidebar isAdmin={admin} />
      <div>
        <div className="col py-3" style={{ marginTop: "80px" }}>
          <PendingTable />
        </div>
      </div>
      {/* <div style={{ padding: "1rem 15px" }} class="container-fluid ">
        <div style={{ padding: "0" }} class="container">
          <div class="row">
            <div class="col-lg-4 pt-3 pt-lg-0"></div>
            <div class="col-lg-8">
              <PendingTable />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Admin;
