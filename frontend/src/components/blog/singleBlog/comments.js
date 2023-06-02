import React from "react";

const Comments = () => {
  return (
    <div>
      <div class="bg-light mb-3" style={{ padding: "30px" }}>
        <h3 class="mb-4">3 Comments</h3>
        <div class="media mb-4">
          <img
            src="img/user.jpg"
            alt="user"
            class="img-fluid mr-3 mt-1"
            style={{ width: "45px" }}
          />
          <div class="media-body">
            <h6>
              <a href="#!">John Doe</a>{" "}
              <small>
                <i>01 Jan 2045</i>
              </small>
            </h6>
            <p>
              Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua,
              tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna
              dolores sed sed eirmod ipsum. Gubergren clita aliquyam consetetur
              sadipscing, at tempor amet ipsum diam tempor consetetur at sit.
            </p>
            <button class="btn btn-sm btn-outline-secondary">Reply</button>
          </div>
        </div>
        <div class="media">
          <img
            src="img/user.jpg"
            alt="user"
            class="img-fluid mr-3 mt-1"
            style={{ width: "45px" }}
          />
          <div class="media-body">
            <h6>
              <a href="#!">John Doe</a>{" "}
              <small>
                <i>01 Jan 2045 at 12:00pm</i>
              </small>
            </h6>
            <p>
              Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua,
              tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna
              dolores sed sed eirmod ipsum. Gubergren clita aliquyam consetetur
              sadipscing, at tempor amet ipsum diam tempor consetetur at sit.
            </p>
            <button class="btn btn-sm btn-outline-secondary">Reply</button>
            <div class="media mt-4">
              <img
                src="img/user.jpg"
                alt="user"
                class="img-fluid mr-3 mt-1"
                style={{ width: "45px" }}
              />
              <div class="media-body">
                <h6>
                  <a href="#!">John Doe</a>{" "}
                  <small>
                    <i>01 Jan 2045 at 12:00pm</i>
                  </small>
                </h6>
                <p>
                  Diam amet duo labore stet elitr invidunt ea clita ipsum
                  voluptua, tempor labore accusam ipsum et no at. Kasd diam
                  tempor rebum magna dolores sed sed eirmod ipsum. Gubergren
                  clita aliquyam consetetur sadipscing, at tempor amet ipsum
                  diam tempor consetetur at sit.
                </p>
                <button class="btn btn-sm btn-outline-secondary">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
