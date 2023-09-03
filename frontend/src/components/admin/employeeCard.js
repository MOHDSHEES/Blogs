import React from "react";
import { useState } from "react";
import EmployeeOldTasks from "../employee.js/employeeOldTasks";
import TaskAssign from "./taskAssign";
import axios from "axios";
import { closeMessage } from "../functions/message";
import { message } from "antd";
import Guidence from "./guidence";
// import { nanoid } from "nanoid";

const EmployeeCard = ({
  employee,
  setEmployees,
  employees,
  onOptionChange,
  radio,
  adminLevel,
  // setFilteredEmployees,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [managerShow, setManagerShow] = useState(false);
  const [oldTasksModal, setOldTasksModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  async function updateDetails(querry) {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    // console.log(date);
    if (window.confirm("Are you sure you want to terminate?") === true) {
      const { data } = await axios.post("/api/update/employees/admin", {
        id: employee._id,
        data: { ...querry, completionDate: formattedDate },
      });

      if (querry.status === data.status && data.status === 0) {
        const d = employees.filter((emp) => emp._id !== data._id);
        setEmployees(d);
        onOptionChange(radio);
        // setFilteredEmployees(d);
      }
    }
    // console.log(data);
  }

  const [disabled, setDisabled] = useState(false);

  // function to release certificate
  async function releaseCertificate(flag, manager) {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    if (flag && !disabled) {
      setDisabled(true);
      const { data } = await axios.post("/api/update/employees/admin", {
        id: employee._id,
        data: {
          certificate: {
            name: employee.name,
            issueDate: formattedDate,
            released: true,
            guidence: manager,
            certificateNo: Math.floor(Math.random() * 9000000000) + 1000000000,
          },
        },
      });
      if (data.certificate.released === true) {
        const d = employees.map((emp) => {
          return emp._id === data._id ? data : emp;
        });
        closeMessage(messageApi, "Certificate issued successfully", "success");
        setEmployees(d);
        onOptionChange(radio);
        setDisabled(false);
        // setFilteredEmployees(d);
      } else {
        setDisabled(false);
        closeMessage(
          messageApi,
          "Something went wrong,Please try again later",
          "error"
        );
      }
    }
  }

  return (
    <div
      className="col-sm employee-padding-0"
      style={{ maxWidth: "400px", minWidth: "290px", marginBottom: "25px" }}
    >
      {contextHolder}
      <div className="card " style={{ borderRadius: "15px" }}>
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
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          </div>

          {adminLevel === 1 &&
            employee.status === 1 &&
            !["6222563006", "9870357609", "9197487964"].includes(
              employee.employeeId
            ) && (
              <div className="employee-status-edit">
                <div class="btn-group dropstart">
                  <button
                    class=" btn-simple"
                    style={{ padding: "5px 10px" }}
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    &#8942;
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        onClick={() => updateDetails({ status: 0 })}
                        class="dropdown-item"
                        href="#!"
                      >
                        Terminate
                      </a>
                    </li>
                    {employee.certificate && !employee.certificate.released && (
                      <li>
                        <a
                          // onClick={() => releaseCertificate(true)}
                          onClick={() => setManagerShow(true)}
                          class="dropdown-item"
                          href="#!"
                        >
                          Release Certificate
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          <h4 className="mb-2">{employee.name}</h4>
          <p className="text-muted mb-4">
            {employee.post}
            <br />
            Emp. Id: {employee.employeeId}
            <br />
            {employee.email}
            <br />
            {employee.score &&
              employee.score.weekly &&
              "Weekly Score: " + employee.score.weekly}
            <br />
            {employee.score &&
              employee.score.preWeek !== -1 &&
              "Pre. week Score: " + employee.score.preWeek}
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
              {employee && employee.completionDate && (
                <div className="px-3">
                  {/* <p className="mb-2 h5">Joining Date</p> */}
                  <small style={{ fontWeight: 600 }}>Completion Date</small>
                  <br />
                  <small>{employee.completionDate}</small>
                  {/* <p className="text-muted mb-0">Income amounts</p> */}
                </div>
              )}
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

          <>
            {employee.status === 1 &&
              (adminLevel === 1 || adminLevel < employee.adminLevel) && (
                <button
                  type="button"
                  onClick={() => setModalShow(true)}
                  className="btn btn-success btn-rounded btn-lg"
                >
                  Assign Task
                </button>
              )}
            <button
              type="button"
              onClick={() => setOldTasksModal(true)}
              className="btn btn-primary btn-rounded btn-lg mx-1"
            >
              Tasks
            </button>
          </>

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
        employees={employees}
        setEmployees={setEmployees}
        // updateStatus={updateStatus}
        // setFilteredEmployees={setFilteredEmployees}
        onOptionChange={onOptionChange}
        radio={radio}
        isAdmin={true}
        show={oldTasksModal}
        assignDate={null}
        onHide={() => setOldTasksModal(false)}
        data={employee}
        adminLevel={adminLevel}
      />
      <TaskAssign
        employees={employees}
        employee={employee}
        onOptionChange={onOptionChange}
        radio={radio}
        // setFilteredEmployees={setFilteredEmployees}
        setEmployees={setEmployees}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Guidence
        show={managerShow}
        onHide={() => setManagerShow(false)}
        releaseCertificate={releaseCertificate}
      />
    </div>
  );
};

export default EmployeeCard;
