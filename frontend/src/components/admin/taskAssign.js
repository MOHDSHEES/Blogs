import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";
import { closeMessage, openMessage } from "../functions/message";

const TaskAssign = (props) => {
  //   console.log(props.employee);
  const [task, setTask] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setDisabled] = useState(false);

  //   console.log(task);
  async function handleSubmit(e) {
    e.preventDefault();
    if (task === null || task.trim() === "") {
      setTask(task.trim());
    } else {
      openMessage(messageApi, "Sending...");
    }

    setDisabled(true);
    const { data } = await axios.post("/api/assign/task/employee", {
      email: props.employee.email,
      task: task,
      taskNo: props.employee.tasks ? props.employee.tasks.length + 1 : 1,
    });
    // console.log(data);
    if (data.status === 200) {
      const updatedData = props.employees.map((c, i) => {
        if (c.employeeId === props.employee.employeeId) {
          return data.data;
        } else return c;
      });
      props.setEmployees(updatedData);
      closeMessage(messageApi, data.msg, "success");
      props.onHide();
    } else {
      closeMessage(messageApi, data.msg, "error");
      // setError(data.message);
      props.onHide();
      // setisValid(false);
    }
    setDisabled(false);
    // console.log(data);
    // }

    // setValidated(true);
  }
  function clear() {
    setTask("");
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
            Task Assigning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-text mb-3">
            Emp. Id: {props.employee.employeeId} <br />
            Name: {props.employee.name}
            <br />
            Task: {props.employee.tasks ? props.employee.tasks.length + 1 : 1}
          </div>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              {/* <label class="form-label">Task</label> */}
              <textarea
                // type=""
                placeholder="Enter task to assign"
                class="form-control"
                rows="6"
                value={task}
                required
                onChange={(e) => setTask(e.target.value)}
              />
              {/* <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div> */}
            </div>

            <button disabled={disabled} type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskAssign;
