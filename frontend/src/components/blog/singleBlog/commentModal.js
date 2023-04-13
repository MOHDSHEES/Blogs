import React from "react";

const CommentModal = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="commentForm"
        tabIndex="-1"
        data-backdrop="static"
        data-keyboard="false"
        role="dialog"
        aria-labelledby="ModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header back-color">
              <h5 className="modal-title" id="ModalLabel1">
                Leave a Comment
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span className="white-text" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div class="toggle-animate">
                  <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" class="form-control" id="name" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" class="form-control" id="email" />
                  </div>
                  {/* <div class="form-group">
                    <label for="website">Website</label>
                    <input type="url" class="form-control" id="website" />
                  </div> */}

                  <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea
                      id="message"
                      cols="30"
                      rows="5"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>
                <div class="form-group mb-0">
                  <button
                    type="submit"
                    // value="Leave a comment"
                    class="btn btn-primary font-weight-semi-bold py-2 px-3"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light mb-3" style={{ padding: "30px" }}>
        <h3 class="mb-4">Leave a comment</h3>
        <div class="form-group mb-0">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#commentForm"
            //   data-bs-whatever="@getbootstrap"
          >
            Leave a Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
