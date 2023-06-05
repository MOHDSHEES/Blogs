import React, { useState, useRef } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";
import { useEffect } from "react";

const Otp = ({ disable, state, setstate, isVerified, setisVerified }) => {
  const emailRef = useRef();
  // hook for storing Entered OTP
  const [OTP, setOTP] = useState("");
  // boolean hook (true if OTP entered is not matched with OTP generated)
  const [OTPMismatch, setOTPMismatch] = useState(false);
  //   // boolean hook (true if email is verified)
  //   const [isVerified, setisVerified] = useState(false);
  // hook for storing boolean value if verify btn is pressed (to run counter)
  const [isActive, setisActive] = useState(false);
  // hook for sendgrid response
  const [Response, setResponse] = useState();
  // hook for storing error from sendgrid api
  const [Error, setError] = useState();
  // boolean hook (true if signUp btn is disabled)
  //   const [disable, setdisable] = useState(true);
  // hook for showing loading while sending OTP
  const [loading, setloading] = useState(false);
  // hook for storing generated OTP
  const [OTPgenerated, setOTPgenerated] = useState("");
  // otp timer and resend
  const [RemainingTime, setRemainingTime] = useState(30);

  //   const [email, setEmail] = useState("");

  // validating email entered and dispatching otp
  async function verify() {
    setError("");
    setResponse("");
    // email validating
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      // generating OTP
      const OTP = Math.floor(Math.random() * 900000 + 100000);
      setOTPgenerated(OTP);
      setloading(true);
      //   console.log(OTP);
      // sending OTP
      try {
        const response = await axios.post("/api/emailotp", {
          email: state.email,
          otp: OTP,
        });
        // const response = { data: { success: true } };
        setloading(false);
        setResponse(response);
        // Activating counter if success
        if (response && response.data.success) {
          //   console.log("in");
          setisActive(true);
        }
      } catch (error) {
        setResponse("");
        setloading(false);
        setError(error.response.data.message);
      }
    } else {
      setResponse("");
      emailRef.current.classList.add("is-invalid");
    }
  }

  function emailInput(e) {
    setisActive(false);
    setError("");
    setOTPMismatch(false);
    disable(true);
    setResponse("");
    setisVerified(false);
    setstate({ ...state, email: e.target.value });
    emailRef.current.classList.remove("is-valid");
    emailRef.current.classList.remove("is-invalid");
    // emailRef.current.classList.remove("form-control");
  }

  // verifying OTP entered
  useEffect(() => {
    if (OTP) {
      if (Number(OTP) === OTPgenerated) {
        setOTPMismatch(false);
        emailRef.current.classList.add("form-control");
        emailRef.current.classList.add("is-valid");
        setisVerified(true);
        disable(false);
        setOTPgenerated("");
        setOTP("");
        setisActive(false);
      } else if (OTP.length === 6 && Number(OTP) !== OTPgenerated) {
        setisVerified(false);
        setOTPMismatch(true);
      }
    }
  }, [OTP, disable, OTPgenerated]);

  useEffect(() => {
    if (RemainingTime !== 0 && isActive) {
      var timer = setTimeout(() => {
        setRemainingTime(RemainingTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [RemainingTime, isActive]);

  function resend() {
    setRemainingTime(30);
    setOTP("");
    setOTPMismatch(false);
    verify();
  }

  return (
    <div>
      <div className="user-validation">
        {/* <form
                  // className=" needs-validation"
                  // className="modalcontent animate"
                  onClick={(e) => verify(e)}
                > */}
        <div className="form-group">
          <label htmlFor="email">
            Email<span className="estrix"> *</span>{" "}
            {/* {isVerified && (
                        <small style={{ color: "green", marginLeft: "3px" }}>
                          <i class="fas fa-check-circle"></i>{" "}
                        </small>
                      )} */}
          </label>
          {/* <div className="input-group mb-2 mr-sm-2"> */}
          {/* <form
                  // className=" needs-validation"
                  // className="modalcontent animate"
                  onClick={(e) => verify(e)}
                > */}

          {/* <div className="user-validation"> */}
          <input
            className="form-control"
            type="Email"
            placeholder="Enter Email"
            name="email"
            autoComplete="off"
            value={state.email}
            ref={emailRef}
            id="email"
            // onChange={(e) => setemail(e.target.value)}

            onChange={(e) => emailInput(e)}
            required
          />
          <div className=" invalid-feedback">Please enter valid Email Id</div>

          {Response && Response.data.success ? (
            <small style={{ color: "green" }}>
              {!isVerified && Response.data.message}
            </small>
          ) : (
            Response && (
              <small style={{ color: "red" }}>{Response.data.message}</small>
            )
          )}

          {Error && <small style={{ color: "red" }}>{Error}</small>}
          {/* </div> */}
          <div>
            {!isVerified && !isActive && (
              <button
                disabled={isActive && loading}
                id="verify-btn"
                type="button"
                style={{ marginTop: "10px" }}
                onClick={verify}
                className="input-group-text"
              >
                {loading ? "Sending..." : "Verify"}
              </button>
            )}
            {isActive && (
              <div>
                {/* <Otp isActive={isActive} /> */}

                {OTPMismatch && (
                  <div style={{ textAlign: "center" }}>
                    <small style={{ color: "red" }}>"Incorrect OTP"</small>
                  </div>
                )}

                <OtpInput
                  value={OTP}
                  className="otp-input"
                  onChange={setOTP}
                  numInputs={6}
                  hasErrored={OTPMismatch}
                  errorStyle={{
                    border: "1px solid red",
                    borderRadius: "5px",
                  }}
                  isInputNum={true}
                  inputStyle={{ width: "30px" }}
                  containerStyle={{ justifyContent: "center", margin: "20px" }}
                  // separator={<span>-</span>}
                />

                {RemainingTime !== 0 ? (
                  <small>Resend OTP in {RemainingTime} Sec </small>
                ) : (
                  // <div className="form-row">
                  //   <div className="form-group col-md-2">
                  <button
                    style={{ marginTop: "10px" }}
                    id="verify-btn"
                    onClick={resend}
                    className="input-group-text"
                  >
                    Resend
                  </button>
                  //   </div>
                  // </div>
                )}
              </div>
            )}
          </div>
          {/* </form> */}
          {/* </div> */}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Otp;
