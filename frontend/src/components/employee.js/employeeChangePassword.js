import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { closeMessage } from "../functions/message";
import { globalContext } from "../../context";
import ForgetPassword from "../login/forgetPassword";
import { Link } from "react-router-dom";
import EmployeeForgetPassword from "./employeeForgetPassword";

const EmployeeChangePassword = (props) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [error, setError] = useState(null);

  const { messageApi } = useContext(globalContext);
  async function submitHandler(e) {
    e.preventDefault();
    if (confirmPassword === newPassword) {
      const { data } = await axios.post("/api/update/employee/password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        token: localStorage.getItem("employeeToken"),
      });
      // console.log(data);
      if (data.status === 200) {
        closeMessage(messageApi, data.msg, "success");
        props.onHide();
      } else if (data.status === 404) setError(data.msg);
      else {
        closeMessage(messageApi, data.msg, "error");
        props.onHide();
      }
    } else setError("Password Mismatch");
  }

  function onChange() {
    setError(null);
  }
  function clear() {
    setConfirmPassword("");
    setError("");
    setOldPassword("");
    setNewPassword("");
  }

  const [forgetModalShow, setForgetModalShow] = useState(false);
  function forgetPassword() {
    setForgetModalShow(true);
    props.onHide();
  }
  return (
    <div>
      <Modal
        onExit={() => {
          clear();
        }}
        {...props}
        size="md"
        aria-labelledby="contained-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal">Change Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div className="mb-4 ">
              <div className="form-outline">
                <input
                  type="password"
                  // id="password"
                  name="newPassword"
                  required
                  value={oldPassword}
                  onChange={(e) => onChange(setOldPassword(e.target.value))}
                  className="form-control "
                />
                <label className="form-label" htmlFor="password">
                  Old Password
                </label>
              </div>
            </div>
            <div className="mb-4 ">
              <div className="form-outline">
                <input
                  type="password"
                  // id="password"
                  name="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => onChange(setNewPassword(e.target.value))}
                  className="form-control "
                />
                <label className="form-label" htmlFor="password">
                  New Password
                </label>
              </div>
            </div>
            <div className="mb-4 ">
              <div className="form-outline">
                <input
                  type="password"
                  // id="cpassword"
                  name="cPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => onChange(setConfirmPassword(e.target.value))}
                  className="form-control "
                />
                <label className="form-label" htmlFor="cpassword">
                  Confirm New Password
                </label>
              </div>
            </div>

            <div className="mt-4 pt-2">
              <input
                className="btn btn-primary "
                type="submit"
                defaultValue="Submit"
              />
              <Link
                style={{ float: "right" }}
                //   variant="primary"
                onClick={forgetPassword}
              >
                Forget Password?
              </Link>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <EmployeeForgetPassword
        show={forgetModalShow}
        onHide={() => setForgetModalShow(false)}
      />
    </div>
  );
};

export default EmployeeChangePassword;
