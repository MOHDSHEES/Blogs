import React from "react";
import { useEffect } from "react";
import PendingTable from "./pendingTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./adminSidebar";
import { useState } from "react";
import EmployeeCard from "./employeeCard";

const Admin = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [employees, setEmployees] = useState(null);
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

  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/find/employees");
      setEmployees(data);
    })();
  }, []);

  // console.log(employees);
  return (
    <div className="body">
      <AdminSidebar isAdmin={admin} setTab={setTab} />

      <div className="col py-3" style={{ marginTop: "80px" }}>
        <PendingTable />
      </div>
      {tab === 1 && (
        <div>
          <section style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-2 ">
              <div className="row d-flex justify-content-center align-items-center ">
                {employees &&
                  employees.map((employee) => {
                    return (
                      <EmployeeCard
                        setEmployees={setEmployees}
                        employees={employees}
                        key={employee._id}
                        employee={employee}
                      />
                    );
                  })}
                {/* <EmployeeCard  />
                <EmployeeCard /> */}
              </div>
            </div>
          </section>
        </div>
      )}
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
