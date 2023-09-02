import React, { useState } from "react";
import axios from "axios";
import states from "../functions/states";
import { useNavigate, useParams } from "react-router-dom";
import { closeMessage } from "../functions/message";
import { useEffect } from "react";

const EmployeeRegister = ({ message }) => {
  const { token } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post(
        "/api/verify/employee/registration/token",
        {
          token: token,
        }
      );
      if (!(data.status === 200)) {
        navigate("/", { replace: true });
        closeMessage(message, data.msg, "error");
      } else {
        setEmail(data.email);
        setPost(data.post);
        setJoiningDate(data.joiningDate);
        setJobType(data.jobType);
        setAdminLevel(data.adminLevel);
      }
    })();
  }, [token, navigate, message]);
  const [email, setEmail] = useState("");
  const [post, setPost] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [jobType, setJobType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminLevel, setAdminLevel] = useState(10);
  const [state, setstate] = useState({
    name: "",
    gender: "",
    address: "",
    district: "",
    pincode: "",
    password: "",
  });

  const Inputchange = (event) => {
    const { name, value } = event.target;
    setstate({
      ...state,
      [name]: value,
    });
  };
  async function submitHandler(e) {
    e.preventDefault();
    const details = {
      ...state,
      email: email,
      adminLevel: adminLevel,
      post: post.trim(),
      joiningDate: joiningDate,
      jobType: jobType,
    };
    if (state.password === confirmPassword) {
      const { data } = await axios.post("/api/save/employee", {
        details,
      });
      if (data && data.status === 200) {
        closeMessage(message, data.msg, "success");
        navigate("/", { replace: true });
      } else if (data && data.status === 11000) {
        closeMessage(message, data.msg, "error");
        navigate("/", { replace: true });
      } else closeMessage(message, data.msg, "error");
    } else {
      closeMessage(message, "Password Mismatch", "error");
    }
    // // console.log(data);
  }
  return (
    <div>
      <div>
        <section className=" gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 ">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <div style={{ textAlign: "center" }}>
                      <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                        Employee/Intern Registeration
                      </h3>
                    </div>
                    <div className="pb-3">
                      <small>
                        Disclaimer: Your Data security is our priority. It will
                        only be used to keep the record. We will not disclose or
                        share you data with anyone.
                      </small>
                    </div>
                    <form onSubmit={submitHandler} class="row g-3">
                      <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={email}
                          required
                          class="form-control"
                          disabled
                          readonly
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">
                          Post *
                        </label>
                        <input
                          type="text"
                          value={post}
                          required
                          class="form-control"
                          disabled
                          readonly
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">
                          Joining Date *
                        </label>
                        <input
                          type="date"
                          value={joiningDate}
                          required
                          class="form-control"
                          disabled
                          readonly
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">
                          Job Type *
                        </label>
                        <input
                          type="text"
                          value={jobType}
                          // onChange={Inputchange}
                          disabled
                          readonly
                          required
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={state.name}
                          onChange={Inputchange}
                          required
                          class="form-control"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">
                          Gender *
                        </label>
                        <select
                          value={state.gender}
                          onChange={Inputchange}
                          name="gender"
                          required
                          class="form-select"
                        >
                          <option selected value="">
                            Choose...
                          </option>
                          <option value="male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div class="col-12">
                        <label for="inputAddress" class="form-label">
                          Address *
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputAddress"
                          name="address"
                          required
                          value={state.address}
                          onChange={Inputchange}
                          placeholder="Enter address"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="inputCity" class="form-label">
                          District *
                        </label>
                        <input
                          type="text"
                          name="district"
                          required
                          value={state.district}
                          onChange={Inputchange}
                          class="form-control"
                          id="inputCity"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputState" class="form-label">
                          State *
                        </label>
                        <select
                          value={state.state}
                          onChange={Inputchange}
                          name="state"
                          id="inputState"
                          required
                          class="form-select"
                        >
                          <option selected value="">
                            Choose...
                          </option>
                          {states.map((state, idx) => {
                            return (
                              <option key={idx} value={state}>
                                {state}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="col-md-2">
                        <label for="inputZip" class="form-label">
                          Pin Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={state.pincode}
                          onChange={Inputchange}
                          class="form-control"
                          id="inputZip"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="inputZip" class="form-label">
                          Password *
                        </label>
                        <input
                          type="password"
                          name="password"
                          required
                          value={state.password}
                          onChange={Inputchange}
                          class="form-control"
                          id="inputZip"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="inputZip" class="form-label">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          name="pincode"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          class="form-control"
                          id="inputZip"
                        />
                      </div>

                      <div class="col-2">
                        <button type="submit" class="btn btn-primary">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeRegister;
