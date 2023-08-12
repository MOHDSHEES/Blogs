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
  const [filteredEmployees, setFilteredEmployees] = useState(null);
  const [radio, setRadio] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onOptionChange(radio);
  }, [employees]);
  // filter function
  function onOptionChange(radio) {
    // console.log("in");
    // console.log(radio);
    setRadio(radio);
    if (radio === "2") {
      setLoading(true);
      const d = employees.filter(
        (emp) => emp.post === "Digital Marketing & SEO"
      );

      setLoading(false);
      setFilteredEmployees(d);
    } else if (radio === "3") {
      setLoading(true);
      const d = employees.filter((emp) => emp.post === "Content Writer");
      setLoading(false);
      setFilteredEmployees(d);
    } else if (radio === "4") {
      setLoading(true);
      const d = employees.filter(
        (emp) => emp.post === "Social Media Management"
      );
      setLoading(false);
      setFilteredEmployees(d);
    } else if (radio === "5") {
      setLoading(true);
      const d = employees.filter((emp) => emp.status === 0);
      setLoading(false);
      setFilteredEmployees(d);
    } else {
      setLoading(false);
      setFilteredEmployees(employees);
    }
  }

  const [adminName, setAdminName] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/authenticate", {
        token: localStorage.getItem("token"),
      });
      if (!(data.status === 200 && data.user.isAdmin)) {
        navigate("/");
      } else if (data.status === 200 && data.user.isAdmin) {
        setAdminName(
          data.user.fname
            ? data.user.fname + " " + data.user.lname
            : data.user.lname
        );
        setAdmin(true);
      }
    })();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/find/employees");
      setEmployees(data);
      setFilteredEmployees(data);
    })();
  }, []);

  // console.log(employees);
  return (
    <div className="body">
      <AdminSidebar isAdmin={admin} setTab={setTab} />
      {tab === 0 ? (
        <div className="col py-3" style={{ marginTop: "80px" }}>
          <PendingTable adminName={adminName} />
        </div>
      ) : (
        tab === 1 && (
          <div style={{ marginTop: "80px" }}>
            <section style={{ backgroundColor: "#f4f5f7" }}>
              <div className="container py-2 ">
                <div
                  class="alert alert-primary employee-filter"
                  role="alert"
                  style={{ marginBottom: "25px" }}
                >
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="1"
                      checked={radio === "1"}
                      onChange={() => onOptionChange("1")}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      All
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="2"
                      checked={radio === "2"}
                      onChange={() => onOptionChange("2")}
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Digital Marketing & SEO
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="3"
                      checked={radio === "3"}
                      onChange={() => onOptionChange("3")}
                    />
                    <label class="form-check-label" for="inlineRadio3">
                      Content Writer
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio4"
                      value="4"
                      checked={radio === "4"}
                      onChange={() => onOptionChange("4")}
                    />
                    <label class="form-check-label" for="inlineRadio4">
                      Social Media Management
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio5"
                      value="5"
                      checked={radio === "5"}
                      onChange={() => onOptionChange("5")}
                    />
                    <label class="form-check-label" for="inlineRadio5">
                      Former Employees
                    </label>
                  </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center ">
                  {loading
                    ? "Loading..."
                    : filteredEmployees &&
                      filteredEmployees.map((employee) => {
                        return radio === "5" ? (
                          <EmployeeCard
                            setEmployees={setEmployees}
                            // setFilteredEmployees={setFilteredEmployees}
                            onOptionChange={(props) => onOptionChange(props)}
                            radio={radio}
                            employees={employees}
                            key={employee._id}
                            employee={employee}
                          />
                        ) : (
                          employee.status === 1 && (
                            <EmployeeCard
                              setEmployees={setEmployees}
                              // setFilteredEmployees={setFilteredEmployees}
                              onOptionChange={(props) => onOptionChange(props)}
                              radio={radio}
                              employees={employees}
                              key={employee._id}
                              employee={employee}
                            />
                          )
                        );
                      })}
                  {/* <EmployeeCard  />
                <EmployeeCard /> */}
                </div>
              </div>
            </section>
          </div>
        )
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
