import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import states from "../functions/states";
import { closeMessage } from "../functions/message";
import { globalContext } from "../../context";
import { useNavigate } from "react-router-dom";

const UpdateDetails = (props) => {
  //   console.log(props.data);
  const { messageApi } = useContext(globalContext);
  const [state, setstate] = useState({
    name: "",
    gender: "",
    address: "",
    district: "",
    pincode: "",
    email: "",
    post: "",
    joiningDate: "",
    jobType: "",
    state: "",
  });
  useEffect(() => {
    setstate({
      name: props.data.name,
      gender: props.data.gender,
      address: props.data.address,
      district: props.data.district,
      pincode: props.data.pincode,
      email: props.data.email,
      post: props.data.post,
      joiningDate: props.data.joiningDate,
      jobType: props.data.jobType,
      state: props.data.state,
    });
  }, [props.data]);

  const Inputchange = (event) => {
    const { name, value } = event.target;
    setstate({
      ...state,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const { data } = await axios.post("/api/update/employee", {
      data: state,
      token: localStorage.getItem("employeeToken"),
    });
    if (data && data.status === 200) {
      closeMessage(messageApi, data.msg, "success");
      let oldData = props.data;
      let newData = data.details;
      //   console.log(newData);
      //   console.log(oldData);
      props.upDatedData({
        ...newData,
        _id: oldData._id,
        employeeId: oldData.employeeId,
        tasks: oldData.tasks,
      });
      props.onHide();
    } else if (data.status === 404) {
      closeMessage(messageApi, data.msg, "error");
      localStorage.removeItem("employeeToken");
      navigate("/employee/login", { replace: true });
    } else {
      closeMessage(messageApi, data.msg, "error");
      props.onHide();
    }
  }

  return (
    <div>
      <Modal
        // onExit={() => {
        //   //   clear();
        // }}
        {...props}
        size="lg"
        aria-labelledby="contained-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal">Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {!isValid && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <small id="emailHelp" class="form-text text-muted mb-3">
            To recover your Password Please enter the Email registered with your
            account.
          </small>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => emailChange(e)}
              placeholder="Enter Email"
              required
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button disabled={disabled} type="submit">
                Send Email
              </Button>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Form> */}
          <p> Employee Id: {props.data.employeeId}</p>

          <form onSubmit={submitHandler} class="row g-3">
            <div class="col-md-4">
              <label for="inputEmail4" class="form-label">
                Email *
              </label>
              <input
                type="email"
                value={state.email}
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
                value={state.post}
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
                value={state.joiningDate}
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
                value={state.jobType}
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
                <option value="">Choose...</option>
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
                <option value="">Choose...</option>
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
            <div class="col-12">
              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateDetails;
