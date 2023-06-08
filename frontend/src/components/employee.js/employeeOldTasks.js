import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import { useState } from "react";
import capital from "../functions/capitaliseStr";

const EmployeeOldTasks = (props) => {
  const [radio, setRadio] = useState("1");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(props.data.tasks && props.data.tasks);
  useEffect(() => {
    if (!data) setData(props.data.tasks);
  }, [props.data.tasks, data]);
  function onOptionChange(e) {
    setRadio(e.target.value);
    if (e.target.value === "2") {
      setLoading(true);
      const d = props.data.tasks.filter((task) => task.status === 0);
      setLoading(false);
      setData(d);
    } else if (e.target.value === "3") {
      setLoading(true);
      const d = props.data.tasks.filter((task) => task.status === 1);
      setLoading(false);
      setData(d);
    } else {
      setLoading(false);
      setData(props.data.tasks);
    }
  }
  console.log(loading);
  return (
    <div>
      {/* {contextHolder} */}
      <Modal
        // onExit={() => {
        //   clear();
        // }}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Previous Tasks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div class="form-text mb-3">
            Emp. Id: <br />
            Name:
          </div> */}
          {/* {!flag && <div>No. previous Tasks </div>} */}
          <br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="1"
              checked={radio === "1"}
              onChange={onOptionChange}
            />
            <label class="form-check-label" for="inlineRadio1">
              All
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="2"
              checked={radio === "2"}
              onChange={onOptionChange}
            />
            <label class="form-check-label" for="inlineRadio2">
              Incomplete
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="3"
              checked={radio === "3"}
              onChange={onOptionChange}
            />
            <label class="form-check-label" for="inlineRadio3">
              Completed
            </label>
          </div>
          <div style={{ maxHeight: "400px", overflow: "scroll" }}>
            {loading
              ? "Loading..."
              : data && (
                  <>
                    <ol
                      className="list-group list-group-flush rounded-3"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {data.map((task, idx) => {
                        return (
                          <>
                            {task.assignDate !== props.assignDate && (
                              <li className=" list-group-item justify-content-between align-items-center p-3">
                                <p
                                  className="mb-1"
                                  key={idx}
                                  style={{ fontSize: ".77rem" }}
                                >
                                  <span style={{ fontWeight: 600 }}>
                                    Task: {task.assignDate}
                                    <span
                                      style={{
                                        float: "right",
                                        color: task.status ? "green " : "red",
                                      }}
                                    >
                                      {task.status ? "Completed" : "Incomplete"}
                                    </span>
                                    <br />
                                  </span>{" "}
                                  {capital(task.task)}
                                  <br />
                                  {!task.status && !props.isAdmin && (
                                    <p
                                      onClick={() =>
                                        props.updateStatus(task.taskNo)
                                      }
                                      className="text-link-blue mt-2"
                                      style={{ float: "right" }}
                                    >
                                      Mark as Complete
                                    </p>
                                  )}
                                </p>
                              </li>
                            )}
                          </>
                        );
                      })}
                    </ol>
                  </>
                )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeOldTasks;
