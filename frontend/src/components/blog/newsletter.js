import React from "react";

const Newsletter = () => {
  return (
    <div>
      <div class="pb-3">
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Newsletter</h3>
        </div>
        <div class="bg-light text-center p-4 mb-3">
          <p>
            Aliqu justo et labore at eirmod justo sea erat diam dolor diam vero
            kasd
          </p>
          <div class="input-group" style={{ width: "100%" }}>
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Your Email"
            />
            <div class="input-group-append">
              <button
                style={{ borderRadius: "0 5px 5px 0" }}
                class="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </div>
          <small>Sit eirmod nonumy kasd eirmod</small>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
