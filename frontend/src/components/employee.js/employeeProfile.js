import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import capital from "../functions/capitaliseStr";
import UpdateDetails from "./updateDetails";
import { globalContext } from "../../context";
import EmployeeChangePassword from "./employeeChangePassword";
import { useCallback } from "react";
import { closeMessage, openMessage } from "../functions/message";
import EmployeeOldTasks from "./employeeOldTasks";
import parse from "html-react-parser";

const EmployeeProfile = () => {
  const { setEmployeeData, messageApi } = useContext(globalContext);
  //   const [updatedData, setUpdatedData] = useState(null);
  const [employee, setEmployee] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     if (updatedData) {
  //       console.log(updatedData);
  //       setData({ ...data, updatedData });
  //       console.log(data);
  //     }
  //   }, [updatedData]);

  //   const [refreshing, setRefreshing] = useState(false);
  const getEmployeeData = useCallback(
    async (refreshing) => {
      // setLoading(true);
      // setRefreshing(true);
      const { data } = await axios.post("/api/authenticate/employee", {
        token: localStorage.getItem("employeeToken"),
      });
      if (refreshing) {
        closeMessage(messageApi, "Updated Sucessfully", "success");
        //   setRefreshing(false);
      }
      // setRefreshing(false);
      // setLoading(false);
      if (data.status === 200) {
        setEmployee(data.user);
      } else {
        localStorage.removeItem("employeeToken");
        setEmployeeData(null);
        navigate("/employee/login");
      }
    },
    [navigate, setEmployeeData, messageApi]
  );
  //   console.log(employee);
  useEffect(() => {
    // console.log("in");
    setLoading(true);
    if (!employee) {
      getEmployeeData(false);
      setAssignDate(new Date().toJSON().slice(0, 10));
    }
    if (employee) setLoading(false);
  }, [getEmployeeData, employee]);
  const [modalShow, setModalShow] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [assignDate, setAssignDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  //   console.log(new Date().toJSON().slice(0, 10));
  const [oldTasksModal, setOldTasksModal] = useState(false);

  const [todayTask, setTodayTask] = useState([]);
  useEffect(() => {
    if (employee) {
      const today = employee.tasks.filter(
        (emp) => emp.assignDate === assignDate
      );
      setTodayTask(today);
    }
  }, [employee, assignDate]);

  async function updateStatus(taskNo) {
    openMessage(messageApi, "Updating Status...");
    const { data } = await axios.post("/api/update/task/status", {
      email: employee.email,
      taskNo: taskNo,
      status: 1,
    });
    if (data.status === 200) {
      const updatedData = todayTask.map((c, i) => {
        if (c.taskNo === taskNo) {
          return { ...c, status: 1 };
        } else return c;
      });
      setTodayTask(updatedData);
      getEmployeeData(true);

      //   setEmployee({ ...employee, updatedData });

      closeMessage(messageApi, data.msg, "success");
    } else {
      closeMessage(messageApi, data.msg, "error");
    }
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-2">
        {/* <div className="row">
          <div className="col">
            <nav
              aria-label="breadcrumb"
              className="bg-light rounded-3 p-3 mb-4"
            >
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">User</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
          </div>
        </div> */}
        {loading ? (
          "Loading..."
        ) : (
          <div className="row mb-5">
            <div className="col-lg-4" style={{ padding: 0 }}>
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={
                      employee.gender === "male"
                        ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{employee.name}</h5>
                  <p className="text-muted mb-1">{employee.post}</p>
                  <p className="text-muted mb-1">{employee.jobType}</p>{" "}
                  {employee.status ? (
                    <p className="text-muted mb-4">
                      Status: <span style={{ color: "green" }}>Working</span>
                    </p>
                  ) : (
                    <p className="text-muted mb-4"> Status: Former</p>
                  )}
                  {/* <p className="text-muted mb-4">
                    {capital(employee.district)}, {employee.state}
                  </p> */}
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      onClick={() => setModalShow(true)}
                      type="button"
                      className="btn btn-primary"
                    >
                      Update Details
                    </button>
                    <button
                      onClick={() => setChangePasswordModal(true)}
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <p className="mb-2 p-2 px-3">
                    <span className="text-primary font-italic me-1">
                      Today's Tasks
                    </span>{" "}
                    <p
                      className="button-link"
                      style={{ float: "right", marginBottom: 0 }}
                      onClick={() => getEmployeeData(true)}
                    >
                      <i class="bx bx-refresh"></i>
                    </p>
                  </p>

                  {todayTask && (
                    <>
                      <ol
                        className="list-group list-group-flush rounded-3"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {todayTask.map((task, idx) => {
                          return (
                            <>
                              {task.assignDate === assignDate && (
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                  <p
                                    className="mb-1"
                                    key={idx}
                                    style={{ fontSize: ".77rem" }}
                                  >
                                    <span style={{ fontWeight: 600 }}>
                                      Task {idx + 1}:
                                    </span>{" "}
                                    {capital(task.task)}
                                  </p>
                                </li>
                              )}
                            </>
                          );
                        })}
                      </ol>
                      {todayTask &&
                        todayTask.length !== employee.tasks.length && (
                          <button
                            onClick={() => setOldTasksModal(true)}
                            type="button"
                            className="btn btn-outline-primary ms-1"
                          >
                            Previous Tasks
                          </button>
                        )}
                    </>
                  )}
                </div>
              </div> */}
            </div>
            <div className="col-lg-8 employee-padding-0">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{employee.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{employee.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Employee Id</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{employee.employeeId}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Joining Date</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{employee.joiningDate}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {capital(employee.address)},{" "}
                        {capital(employee.district)}, {employee.state},{" "}
                        {employee.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row"> */}
              {/* <div className="col-md-6"> */}
              <div>
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4">
                      <span className="text-primary font-italic me-1">
                        {/* Assignment */}
                        Today's Tasks:
                      </span>{" "}
                      <p
                        className="button-link"
                        style={{ float: "right", marginBottom: 0 }}
                        onClick={() => getEmployeeData(true)}
                      >
                        <i class="bx bx-refresh"></i> Refresh
                      </p>
                      {/* Today's Tasks: */}
                    </p>

                    {todayTask && todayTask.length !== 0 ? (
                      <>
                        <ol
                          className="list-group list-group-flush rounded-3"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {/* {tasks(employee.tasks)} */}
                          {todayTask.map((task, idx) => {
                            return (
                              <>
                                {task.assignDate === assignDate && (
                                  <li className="list-group-item justify-content-between align-items-center p-3">
                                    <p
                                      className="mb-1"
                                      key={idx}
                                      style={{ fontSize: ".77rem" }}
                                    >
                                      <span style={{ fontWeight: 600 }}>
                                        Task {idx + 1}:
                                        <span
                                          style={{
                                            float: "right",
                                            color: task.status
                                              ? "green "
                                              : "red",
                                          }}
                                        >
                                          {task.status
                                            ? "Completed"
                                            : "Incomplete"}
                                        </span>
                                        <br />
                                      </span>{" "}
                                      {capital(task.task)
                                        .split("\n")
                                        .map((str, idx) => (
                                          <p
                                            key={idx}
                                            style={{ marginBottom: 0 }}
                                          >
                                            {parse(str)}
                                          </p>
                                        ))}
                                      <br />
                                      {!task.status && (
                                        <p
                                          onClick={() =>
                                            updateStatus(task.taskNo)
                                          }
                                          className="text-link-blue mt-2"
                                          style={{ float: "right" }}
                                        >
                                          Mark as Complete
                                        </p>
                                      )}
                                    </p>
                                  </li>
                                )}
                              </>
                            );
                          })}
                        </ol>
                      </>
                    ) : (
                      <div>No task for Today.</div>
                    )}
                    {todayTask.length !== employee.tasks.length && (
                      <button
                        onClick={() => setOldTasksModal(true)}
                        type="button"
                        className="btn btn-outline-primary ms-1 mt-2"
                      >
                        Previous Tasks
                      </button>
                    )}
                    {/* <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
      <UpdateDetails
        upDatedData={setEmployee}
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={employee}
      />
      <EmployeeChangePassword
        show={changePasswordModal}
        onHide={() => setChangePasswordModal(false)}
        data={employee}
      />
      <EmployeeOldTasks
        updateStatus={updateStatus}
        show={oldTasksModal}
        assignDate={assignDate}
        onHide={() => setOldTasksModal(false)}
        data={employee}
      />
    </section>
  );
};

export default EmployeeProfile;
