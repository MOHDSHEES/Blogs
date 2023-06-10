import React from "react";
import { useState } from "react";
import EmployeeOldTasks from "../employee.js/employeeOldTasks";
import TaskAssign from "./taskAssign";

const EmployeeCard = ({ employee, setEmployees, employees }) => {
  //   console.log(employee);
  const [modalShow, setModalShow] = useState(false);
  const [oldTasksModal, setOldTasksModal] = useState(false);

  return (
    <div
      className="col-sm employee-padding-0"
      style={{ maxWidth: "400px", minWidth: "290px", marginBottom: "25px" }}
    >
      <div className="card" style={{ borderRadius: "15px" }}>
        <div className="card-body text-center">
          <div className="mt-3 mb-4">
            <img
              src={
                employee.profileImg
                  ? employee.profileImg
                  : employee.gender === "male"
                  ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
              }
              className="rounded-circle img-fluid"
              alt="profile"
              style={{ width: "100px" }}
            />
          </div>
          <h4 className="mb-2">{employee.name}</h4>
          <p className="text-muted mb-4">
            {employee.post}
            <br />
            Emp. Id: {employee.employeeId}
            <br />
            {employee.email}
            <br />
            <div className="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <small style={{ fontWeight: 600 }}>Job Type</small>
                <br />
                <small>{employee.jobType}</small>
                {/* <p className="text-muted mb-0">Wallets Balance</p> */}
              </div>
              <div className="px-3">
                {/* <p className="mb-2 h5">Joining Date</p> */}
                <small style={{ fontWeight: 600 }}>Joining Date</small>
                <br />
                <small>{employee.joiningDate}</small>
                {/* <p className="text-muted mb-0">Income amounts</p> */}
              </div>
            </div>
          </p>

          {/* <p className="text-muted mb-4">{employee.email}</p> */}
          {/* <div className="mb-4 pb-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-floating"
            >
              <i className="fab fa-facebook-f fa-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-floating"
            >
              <i className="fab fa-twitter fa-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-floating"
            >
              <i className="fab fa-skype fa-lg" />
            </button>
          </div> */}

          <button
            type="button"
            onClick={() => setModalShow(true)}
            className="btn btn-success btn-rounded btn-lg"
          >
            Assign Task
          </button>
          <button
            type="button"
            onClick={() => setOldTasksModal(true)}
            className="btn btn-primary btn-rounded btn-lg mx-1"
          >
            Tasks
          </button>

          {/* <div className="d-flex justify-content-between text-center mt-5 mb-2">
            <div>
              <p className="mb-2 h5">8471</p>
              <p className="text-muted mb-0">Wallets Balance</p>
            </div>
            <div className="px-3">
              <p className="mb-2 h5">8512</p>
              <p className="text-muted mb-0">Income amounts</p>
            </div>
            <div>
              <p className="mb-2 h5">4751</p>
              <p className="text-muted mb-0">Total Transactions</p>
            </div>
          </div> */}
        </div>
      </div>
      <EmployeeOldTasks
        // updateStatus={updateStatus}
        isAdmin={true}
        show={oldTasksModal}
        assignDate={null}
        onHide={() => setOldTasksModal(false)}
        data={employee}
      />
      <TaskAssign
        employees={employees}
        employee={employee}
        setEmployees={setEmployees}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default EmployeeCard;
