import React, { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { message } from "antd";
import { closeMessage } from "../functions/message";
import Otp from "./otp";

const Signup = ({ message }) => {
  const navigate = useNavigate();
  const [cpassword, setcpassword] = useState("");
  //   const [messageApi, contextHolder] = message.useMessage();
  const [state, setstate] = useState({
    fname: "",
    lname: "",
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
  async function submitHandler(e) {
    e.preventDefault();
    if (state.password === cpassword) {
      if (isVerified) {
        const { data } = await axios.post("/api/save/user", { detail: state });
        //   console.log(data);
        if (data && data.user && data.user._id) {
          closeMessage(message, "Sucessfully Registered", "success");
          localStorage.setItem("token", data.token);
          navigate("/add", { replace: true });
        } else if (data.user.msg.split(" ")[0] === "E11000")
          closeMessage(message, "Email Id already registered with us", "error");
        else closeMessage(message, data.user.msg, "error");
      } else closeMessage(message, "Please verify email", "error");
    } else closeMessage(message, "Password Missmatch", "error");
  }

  // console.log(state);
  // boolean hook (true if email is verified)
  const [isVerified, setisVerified] = useState(false);
  // boolean hook (true if signUp btn is disabled)
  const [disable, setdisable] = useState(true);
  return (
    <div>
      {/* {contextHolder} */}
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
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Sign Up</h3>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            name="fname"
                            value={state.fname}
                            onChange={Inputchange}
                            required
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            name="lname"
                            value={state.lname}
                            onChange={Inputchange}
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mb-4 ">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          name="email"
                          value={state.email}
                          onChange={Inputchange}
                          required
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                      </div>
                    </div> */}
                    <Otp
                      disable={setdisable}
                      setstate={setstate}
                      setisVerified={setisVerified}
                      isVerified={isVerified}
                      state={state}
                    />

                    {/*  */}
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={state.password}
                            onChange={Inputchange}
                            required
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="cpass"
                            value={cpassword}
                            required
                            onChange={(e) =>
                              setcpassword(e.target.value.trim())
                            }
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="cpass">
                            Confirm Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={disable}
                        defaultValue="Submit"
                      />
                      <p className="mt-2">
                        Already Have an account? <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
