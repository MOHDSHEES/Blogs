import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { closeMessage } from "../functions/message";

const ChangePassword = ({ message }) => {
  const { token } = useParams();
  //   console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      // setloading(true);
      const { data } = await axios.post("/api/verifyPassword/token", {
        token: token,
      });
      if (!(data.status === 200)) {
        navigate("/login", { replace: true });
        closeMessage(message, data.msg, "error");
      }
    })();
  }, [token, navigate, message]);
  const [state, setstate] = useState({
    newPassword: "",
    cPassword: "",
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
    if (state.newPassword === state.cPassword) {
      const { data } = await axios.post("/api/change/password", {
        password: state.newPassword,
        token: token,
      });
      if (data.status === 200) {
        closeMessage(message, data.msg, "success");
        navigate("/login", { replace: true });
      } else if (data.status === 404) {
        closeMessage(message, data.msg, "error");
        navigate("/login", { replace: true });
      } else closeMessage(message, data.msg, "error");
    } else {
      closeMessage(message, "Password Mismatch", "error");
    }
  }
  return (
    <div>
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
                        Create New Password
                      </h3>
                    </div>
                    <form onSubmit={submitHandler}>
                      <div className="mb-4 ">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="password"
                            name="newPassword"
                            required
                            value={state.newPassword}
                            onChange={Inputchange}
                            className="form-control form-control-lg"
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
                            id="cpassword"
                            name="cPassword"
                            required
                            value={state.confirmPassword}
                            onChange={Inputchange}
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="cpassword">
                            Confirm New Password
                          </label>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <input
                          className="btn btn-primary btn-lg"
                          type="submit"
                          defaultValue="Submit"
                        />
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

export default ChangePassword;
