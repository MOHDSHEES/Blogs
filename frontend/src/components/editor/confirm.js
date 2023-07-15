import React from "react";
import parse from "html-react-parser";

const Confirm = ({ message, ok, cancel, okFunction, cancelFunction }) => {
  return (
    <div
      class="modal fade"
      style={{ zIndex: 1000 }}
      id="staticBackdrop1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel1"
      aria-hidden="true"
    >
      {/* {contextHolder} */}
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="staticBackdropLabel1">
              OFFTHEWEB
            </h2>
          </div>
          <div class="modal-body">{parse(message)}</div>
          <div class="modal-footer">
            <button
              type="button"
              onClick={() => okFunction()}
              class="btn btn-success"
              //   onClick={clear}
              //   data-bs-dismiss="modal"
            >
              {ok}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => cancelFunction()}
              //   onClick={clear}
              //   data-bs-dismiss="modal"
            >
              {cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
