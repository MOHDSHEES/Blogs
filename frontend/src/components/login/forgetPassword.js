import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";
import { closeMessage, openMessage } from "../functions/message";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  function emailChange(e) {
    setEmail(e.target.value);
    setValidated(false);
    setisValid(true);
  }

  const [messageApi, contextHolder] = message.useMessage();
  const [validated, setValidated] = useState(false);
  const [isValid, setisValid] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      openMessage(messageApi, "Sending...");
      setDisabled(true);
      const { data } = await axios.post("/api/forgetPassword", {
        email: email,
      });
      if (data.success) {
        closeMessage(messageApi, data.message, "success");
        props.onHide();
      } else {
        closeMessage(messageApi, data.message, "success");
        setError(data.message);
        setisValid(false);
      }
      setDisabled(false);
      // console.log(data);
    }

    setValidated(true);
  }
  function clear() {
    setEmail("");
    setValidated(false);
    setisValid(true);
  }
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
            Password Recovery
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isValid && (
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
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
