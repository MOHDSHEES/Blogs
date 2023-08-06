import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";
import { closeMessage, openMessage } from "../functions/message";

const TaskAssign = (props) => {
  //   console.log(props.employee);
  const [task, setTask] = useState(props.oldTask ? props.oldTask.task : "");
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (props.oldTask) {
      setTask(props.oldTask.task);
      // console.log(props.oldTask.status);
    }
  }, [props]);
  //   console.log(task);
  async function handleSubmit(e) {
    e.preventDefault();
    if (task === null || task.trim() === "") {
      setTask(task.trim());
      closeMessage(messageApi, "Task cannot be Empty", "error");
    } else {
      openMessage(messageApi, "Sending...");
      setDisabled(true);
      if (props.oldTask) {
        // console.log("in");
        const { data } = await axios.post("/api/update/task/employee", {
          email: props.employee.email,
          newTask: task,
          taskNo: props.oldTask.taskNo,
        });
        if (data.status === 200) {
          const updatedData = props.employees.map((c, i) => {
            if (c.employeeId === props.employee.employeeId) {
              return data.data;
            } else return c;
          });
          props.setFilteredEmployees(updatedData);
          props.setEmployees(updatedData);
          closeMessage(messageApi, data.msg, "success");
          props.onHide();
        } else {
          closeMessage(messageApi, data.msg, "error");
          // setError(data.message);
          props.onHide();
          // setisValid(false);
        }
      } else {
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
          props.setFilteredEmployees(updatedData);
          props.setEmployees(updatedData);
          closeMessage(messageApi, data.msg, "success");
          props.onHide();
        } else {
          closeMessage(messageApi, data.msg, "error");
          // setError(data.message);
          props.onHide();
          // setisValid(false);
        }
      }
      setDisabled(false);
    }
    // console.log(data);
    // }

    // setValidated(true);
  }
  function clear() {
    setTask("");
  }

  async function updateStatus() {
    openMessage(messageApi, "Updating Status...");
    const { data } = await axios.post("/api/update/task/status", {
      email: props.employee.email,
      taskNo: props.oldTask.taskNo,
      status: 0,
    });
    if (data.status === 200) {
      // console.log(data);
      const updatedData = props.employees.map((c, i) => {
        if (c.employeeId === props.employee.employeeId) {
          return data.data;
        } else return c;
      });
      props.setFilteredEmployees(updatedData);
      props.setEmployees(updatedData);

      closeMessage(messageApi, data.msg, "success");
      props.onHide();
    } else {
      closeMessage(messageApi, data.msg, "error");
    }
  }

  async function scoring() {
    let score = prompt("Please enter Score between 1 to 10.");
    if (
      score &&
      score.trim() &&
      parseFloat(score) &&
      score >= 0 &&
      score <= 10
    ) {
      openMessage(messageApi, "Updating Status...");
      const { data } = await axios.post("/api/update/task/score", {
        email: props.employee.email,
        taskNo: props.oldTask.taskNo,
        date: props.oldTask.assignDate,
        score: parseFloat(score),
      });
      if (data.status === 200) {
        // console.log(data);
        const updatedData = props.employees.map((c, i) => {
          if (c.employeeId === props.employee.employeeId) {
            return data.data;
          } else return c;
        });
        props.setFilteredEmployees(updatedData);
        props.setEmployees(updatedData);

        props.onHide();

        closeMessage(messageApi, data.msg, "success");
      } else {
        closeMessage(messageApi, data.msg, "error");
      }
    } else {
      closeMessage(messageApi, "Enter valid score", "error");
    }
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
            {props.oldTask && props.oldTask.task && (
              <button
                onClick={scoring}
                style={{ float: "right", marginRight: "10px" }}
                className="btn btn-success"
              >
                Rate
              </button>
            )}
            Emp. Id: {props.employee.employeeId} <br />
            Name: {props.employee.name}
            <br />
            Task:{" "}
            {props.oldTask
              ? props.oldTask.taskNo
              : props.employee.tasks
              ? props.employee.tasks.length + 1
              : 1}
            <br />
            Score:{" "}
            {props.oldTask && props.oldTask.score
              ? props.oldTask.score
              : "Not rated"}
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
            {props.oldTask && props.oldTask.status === 1 && (
              <button
                type="btn"
                style={{ marginLeft: "20px" }}
                onClick={updateStatus}
                class="btn btn-primary"
              >
                Mark as Incomplete
              </button>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskAssign;
