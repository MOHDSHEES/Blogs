import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { closeMessage } from "../functions/message";
import ForgetPassword from "./forgetPassword";
import { globalContext } from "../../context";
import { useContext } from "react";
import EmployeeForgetPassword from "../employee.js/employeeForgetPassword";

const EmployeeLogin = ({ message }) => {
  const { setEmployeeData } = useContext(globalContext);

  const [state, setstate] = useState({
    email: "",
    password: "",
  });
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setstate({
      ...state,
      [name]: value.trim(),
    });
  };

  let navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const { data } = await axios.post("/api/find/employee", {
      email: state.email,
      password: state.password,
    });
    // console.log(data);
    if (data && data.token) {
      localStorage.setItem("employeeToken", data.token);
      setEmployeeData(data);
      navigate("/employee/" + data.user.employeeId, { replace: true });
      // redirect("/employee/" + data.user.employeeId);
    } else {
      closeMessage(message, data.msg, "error");
    }
    // console.log(data);
  }
  async function validate() {
    const { data } = await axios.post("/api/authenticate/employee", {
      token: localStorage.getItem("employeeToken"),
    });
    // console.log(data);
    if (data.status === 200) {
      navigate(`/employee/${data.user.employeeId}`);
    } else {
      localStorage.removeItem("employeeToken");
    }
  }
  useEffect(() => {
    validate();
  }, []);
  //   useEffect(() => {
  //     localStorage.removeItem("token");
  //   }, []);
  // const [modalShow, setModalShow] = useState(false);
  const [forgetModalShow, setForgetModalShow] = useState(false);
  function forgetPassword() {
    setForgetModalShow(true);
    // props.onHide();
  }
  return (
    <div>
      <section className=" gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <div style={{ textAlign: "center" }}>
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                      Employee Log In
                    </h3>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="mb-4 ">
                      <div className="form-outline">
                        <input
                          type="email"
                          // placeholder="Enter email id"
                          id="emailAddress"
                          name="email"
                          required
                          value={state.email}
                          onChange={Inputchange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="mb-4 ">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          required
                          value={state.password}
                          onChange={Inputchange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
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
                  <EmployeeForgetPassword
                    show={forgetModalShow}
                    onHide={() => setForgetModalShow(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeLogin;
