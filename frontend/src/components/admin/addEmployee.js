import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { message } from "antd";
import { closeMessage } from "../functions/message";
import axios from "axios";

const AddEmployee = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [validated, setValidated] = useState(false);
  //   const [isValid, setisValid] = useState(true);
  //   const [error, setError] = useState(null);

  const [state, setstate] = useState({
    email: "",
    joiningDate: "",
    post: "",
  });
  const Inputchange = (event) => {
    setValidated(false);
    const { name, value } = event.target;
    setstate({
      ...state,
      [name]: value.trim(),
    });
  };
  function clear() {
    setstate({ email: "", joiningDate: "", post: "" });
    setValidated(false);
    // setisValid(true);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const { data } = await axios.post("/api/add/employee/sendemail", {
        state: state,
      });
      //   console.log(data);
      //   console.log(state);
      if (data.success) {
        closeMessage(messageApi, data.message, "success");
        props.onHide();
      } else {
        closeMessage(messageApi, data.message, "error");
        // setisValid(false);
      }
      // console.log(data);
    }

    setValidated(true);
    // const { data } = await axios.post("/api/find/user", {
    //   email: state.email,
    //   password: state.password,
    // });

    // console.log(data);
  }

  //   async function verify(event) {
  //     console.log("in");
  //     const { data } = await axios.post(
  //       "/api/verify/employee/registration/token",
  //       {
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGQuc2hlZXMxMDBAZ21haWwuY29tIiwicG9zdCI6ImhnamgiLCJqb2luaW5nRGF0ZSI6IjIwMjMtMDYtMjMiLCJpYXQiOjE2ODU4MDk0MDJ9.uAXWQz1Dvf2pMWw6i3g1v89Mi0T29pGgE4PxhXf-wf8",
  //       }
  //     );
  //     console.log(data);
  //   }

  return (
    <div>
      {contextHolder}
      <Modal
        onExit={() => {
          clear();
        }}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Employee/Intern registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {!isValid && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )} */}
          <small id="emailHelp" class="form-text text-muted mb-3">
            Link generated can be used only once.
          </small>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={state.email}
                onChange={Inputchange}
                placeholder="Enter Email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter Valid Email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Enter the Post of Employee/Intern *</Form.Label>
              <Form.Control
                type="text"
                name="post"
                value={state.post}
                onChange={Inputchange}
                placeholder="Enter Post"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter post.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>
                Select the Joining Date of Employee/Intern *
              </Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={state.joiningDate}
                onChange={Inputchange}
                placeholder="select joining date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose Joining Date .
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback> */}
            <Modal.Footer>
              <Button type="submit">Send Email</Button>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddEmployee;
