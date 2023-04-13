import React, { useState } from "react";
import Sidebar from "./sidebar";
import axios from "axios";
import Autocomplete from "./autocomplete/autocomplete";
import Alert from "react-bootstrap/Alert";

const Form = () => {
  const [status, setStatus] = useState(null);
  const [show, setShow] = useState(false);
  const [titles, setTitles] = useState([]);
  // const [search, setSearch] = useState("");
  const [id, setId] = useState(null);
  const [flag, setFlag] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(0);
  const [blog, setblog] = useState([{ tag: "P" }]);
  const [title, settitle] = useState("");
  const [mainImg, setmainImg] = useState("");
  const [category, setcategory] = useState("");

  function reset() {
    setUpdateFlag(1);
    setblog([{ tag: "P" }]);
    setcategory("");
    setmainImg("");
    settitle("");
  }
  function newBlog() {
    reset();
    setUpdateFlag(0);
    setFlag(0);
  }

  function handleChange(i, event, img = false) {
    const values = [...blog];
    if (img) {
      values[i] = { ...values[i], img: event.target.value };
    } else values[i] = { ...values[i], text: event.target.value };

    setblog(values);
  }

  async function editBlog() {
    const { data } = await axios.post("/api/blog/titles");
    setTitles(data);
    setFlag(1);
    setUpdateFlag(1);
  }
  async function searchHandler(e, search) {
    e.preventDefault();
    const { data } = await axios.post("/api/find/blog", {
      title: search,
    });
    if (data.length) {
      setId(data[0]._id);
      setblog(data[0].blog);
      setcategory(data[0].category);
      setmainImg(data[0].mainImg);
      settitle(data[0].title);
      setUpdateFlag(0);
    } else {
      setStatus({ msg: "Blog not Found." });
      // var modal = document.getElementById("alert");
      // modal.classList.toggle("show");
      setShow(true);
      reset();
    }
  }

  // adding new color input field
  function handleAddP() {
    const values = [...blog];
    values.push({ tag: "P" });
    setblog(values);
  }
  function handleAddIT() {
    const values = [...blog];
    values.push({ tag: "IT" });
    setblog(values);
  }

  function handleAddTI() {
    const values = [...blog];
    values.push({ tag: "TI" });
    setblog(values);
  }
  function handleAddH() {
    const values = [...blog];
    values.push({ tag: "H" });
    setblog(values);
  }
  // removing color input field
  function handleRemove(i) {
    const values = [...blog];
    values.splice(i, 1);
    setblog(values);
  }
  async function deleteBlog(e) {
    e.preventDefault();
    let text = "Are you sure you want to delete this blog.\n";
    if (window.confirm(text) === true) {
      const { data } = await axios.post("/api/delete/blog", {
        id: id,
      });
      if (data.status) {
        setStatus(data);
        setShow(true);
        newBlog();
      } else {
        setStatus(data);
        setShow(true);
      }
    }
  }

  async function saveBlog(e) {
    e.preventDefault();
    // console.log(flag);

    if (flag) {
      const { data } = await axios.post("/api/update/blog", {
        id: id,
        title,
        mainImg,
        category,
        blog,
      });
      setStatus(data);
      setShow(true);
      // reset();
    } else {
      const { data } = await axios.post("/api/add/blog", {
        title,
        mainImg,
        category,
        blog,
      });
      setStatus(data);
      setShow(true);
      newBlog();
    }
  }
  return (
    <div className="body">
      <Sidebar
        onClickH={handleAddH}
        onClickP={handleAddP}
        onClickIT={handleAddIT}
        onClickTI={handleAddTI}
        onClickEdit={editBlog}
      />
      <div>
        {show && (
          <Alert
            style={{ zIndex: "3" }}
            className="alert1"
            variant="primary"
            onClose={() => setShow(false)}
            dismissible
          >
            {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
            <p>{status && status.msg}</p>
          </Alert>
        )}

        {/* <div
          id="alert"
          style={{ zIndex: "3" }}
          class="alert alert1 alert-primary alert-dismissible fade"
          role="alert"
        >
          {status && status.msg}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div> */}
        {flag ? (
          <div style={{ marginTop: "80px" }}>
            {/* <form class="mb-1 " onSubmit={searchHandler}> */}
            {/* <div class="input-group mt-3"> */}
            <Autocomplete searchHandler={searchHandler} suggestions={titles} />
            {/* <input
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Please enter the title to search the blogs... "
                  required
                /> */}
            {/* <button type="submit" class="input-group-text btn btn-primary">
                  Search
                </button> */}
            {/* <span class="" id="basic-addon2">@example.com</span> */}
            {/* </div> */}
            {/* </form> */}
            <a onClick={newBlog} href="" className="ms-2">
              Write a new Blog?
            </a>
          </div>
        ) : (
          ""
        )}

        {!updateFlag ? (
          <form onSubmit={saveBlog} style={{ marginTop: "80px" }}>
            <div class="p-3 bg-light">
              <div style={{ marginBottom: "5px" }}>
                <small>Title</small>
              </div>

              <input
                className="form-control"
                // id={"p" + idx}
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Please enter the title of the blog..."
                autocomplete="off"
                required
              />

              <div style={{ margin: "10px 0 5px" }}>
                <small>Main Image</small>
              </div>

              <input
                className="form-control"
                // id={"p" + idx}
                value={mainImg}
                onChange={(e) => setmainImg(e.target.value)}
                placeholder="Please enter the URL of main image..."
                autocomplete="off"
                required
              />

              <div style={{ margin: "10px 0 5px" }}>
                <small>Category</small>
              </div>

              <input
                className="form-control"
                // id={"p" + idx}
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                placeholder="Please enter the category of the blog..."
                autocomplete="off"
                required
              />
            </div>
            {blog.map((bl, idx) => {
              return (
                <div class="my-3 p-3 bg-light">
                  {bl.tag === "P" ? (
                    <div class=" my-2">
                      <div style={{ marginBottom: "5px" }}>
                        <small>Paragraph Text Box</small>
                        {blog.length !== 1 && (
                          <button
                            type="button"
                            className="cancel-btn btn btn-outline-danger input-group-text"
                            onClick={() => handleRemove(idx)}
                          >
                            X
                          </button>
                        )}
                      </div>

                      <textarea
                        className="form-control"
                        id={"p" + idx}
                        value={bl.text || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Please enter the paragraph text..."
                        required
                        rows="10"
                        cols="50"
                      />
                    </div>
                  ) : bl.tag === "H" ? (
                    <div class=" my-2">
                      <div style={{ marginBottom: "5px" }}>
                        <small>Heading Input</small>
                        {blog.length !== 1 && (
                          <button
                            type="button"
                            className="cancel-btn btn btn-outline-danger input-group-text"
                            onClick={() => handleRemove(idx)}
                          >
                            X
                          </button>
                        )}
                      </div>

                      <input
                        className="form-control"
                        id={"h" + idx}
                        value={bl.text || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Please enter the heading..."
                        autocomplete="off"
                        required
                      />
                    </div>
                  ) : bl.tag === "IT" ? (
                    <div class="form-group my-2">
                      <div style={{ marginBottom: "5px" }}>
                        <small>Image on Left and Text on Right</small>
                        {blog.length !== 1 && (
                          <button
                            type="button"
                            className="cancel-btn btn btn-outline-danger input-group-text"
                            onClick={() => handleRemove(idx)}
                          >
                            X
                          </button>
                        )}
                      </div>
                      {/* <div class="input-group"> */}
                      <textarea
                        className="form-control"
                        id={"it" + idx}
                        value={bl.text || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Please enter the text to be displayed on right side of image..."
                        required
                        rows="10"
                        cols="50"
                      />

                      <div class="mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id={"it" + idx}
                          value={bl.img || ""}
                          onChange={(e) => handleChange(idx, e, true)}
                          placeholder="Please enter the URL of image..."
                          autocomplete="off"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div class="form-group my-2">
                      <div style={{ marginBottom: "5px" }}>
                        <small>Text on Left and Image on Right</small>
                        {blog.length !== 1 && (
                          <button
                            type="button"
                            className="cancel-btn btn btn-outline-danger input-group-text"
                            onClick={() => handleRemove(idx)}
                          >
                            X
                          </button>
                        )}
                      </div>
                      <textarea
                        className="form-control"
                        id={"ti" + idx}
                        value={bl.text || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Please enter the text to be displayed on left side of image..."
                        required
                        rows="10"
                        cols="50"
                      />

                      <div class="mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id={"ti" + idx}
                          value={bl.img || ""}
                          onChange={(e) => handleChange(idx, e, true)}
                          placeholder="Please enter the URL of image..."
                          autocomplete="off"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <button type="submit" class="m-3 btn btn-primary">
              {flag ? "Update" : "Save"}
            </button>
            {/* {title && (
              <Link
                to={{
                  pathname: "/blog/preview",
                  query: {
                    title: title,
                    category: category,
                    mainImg: mainImg,
                    blog: blog,
                  },
                }}
                target="_blank"
                class="m-3 btn btn-primary"
              >
                Preview
              </Link>
            )} */}
            {flag ? (
              <div>
                <button
                  onClick={reset}
                  type="button"
                  class="m-3 btn btn-danger"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => deleteBlog(e)}
                  type="button"
                  class="m-3 btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Form;
