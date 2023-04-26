import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from "axios";
import Autocomplete from "../autocomplete/autocomplete";
// import Alert from "react-bootstrap/Alert";
import { openMessage, closeMessage } from "../functions/message";
import { message, Popover, Drawer } from "antd";
import { Link } from "react-router-dom";

const Form = ({ cate }) => {
  // const [status, setStatus] = useState(null);
  const [disabled, setdisabled] = useState(false);
  // const [show, setShow] = useState(false);
  const [titles, setTitles] = useState([]);
  // const [search, setSearch] = useState("");
  const [id, setId] = useState(null);
  const [flag, setFlag] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(0);
  const [blog, setblog] = useState([{ tag: "P" }]);
  const [title, settitle] = useState("");
  const [mainImg, setmainImg] = useState("");
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [checkBox, setcheckBox] = useState(false);
  const [categoryImg, setcategoryImg] = useState("");
  const [openpopover, setopenpopover] = useState(false);

  const [tagId, setTagId] = useState(null);
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

  useEffect(() => {
    setCategories(cate);
  }, [cate]);
  // useEffect(() => {
  //   if (!categories) {
  //     (async () => {
  //       // setloading(true);
  //       const { data } = await axios.post("/api/find/categories");
  //       setCategories(data);
  //     })();
  //   }
  // }, [categories]);

  async function editBlog() {
    setFlag(1);
    setUpdateFlag(1);
    const { data } = await axios.post("/api/blog/titles");
    setTitles(data);
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
      // setStatus({ msg: "Blog not Found." });
      closeMessage(messageApi, "Blog not Found", "error");
      // var modal = document.getElementById("alert");
      // modal.classList.toggle("show");
      // setShow(true);
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

  function handleAddInBetween(i, tag) {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // console.log(i);
    const values = [...blog];
    values.splice(i, 0, { tag: tag });
    setblog(values);
    setopenpopover(false);
    // console.log(arr);
  }

  console.log(blog);
  async function deleteBlog(e) {
    e.preventDefault();
    openMessage(messageApi, "Deleting...");
    let text = "Are you sure you want to delete this blog.\n";
    if (window.confirm(text) === true) {
      const { data } = await axios.post("/api/delete/blog", {
        id: id,
      });
      if (data.status) {
        closeMessage(messageApi, data.msg, "success");
        // setStatus(data);
        // setShow(true);
        newBlog();
      } else {
        closeMessage(messageApi, data.msg, "error");
        // setStatus(data);
        // setShow(true);
      }
    }
  }

  async function saveBlog(e) {
    e.preventDefault();
    openMessage(messageApi, "Saving...");
    setdisabled(true);

    // console.log(flag);

    if (flag) {
      const { data } = await axios.post("/api/update/blog", {
        id: id,
        title,
        mainImg,
        category,
        blog,
      });
      // setStatus(data);
      // setShow(true);
      closeMessage(messageApi, data.msg, "success");
      // reset();
    } else {
      const { data } = await axios.post("/api/add/blog", {
        title,
        mainImg,
        category,
        blog,
      });
      // setStatus(data);
      // setShow(true);
      closeMessage(messageApi, data.msg, "success");
      newBlog();
    }
    setdisabled(false);
  }

  function checkBoxHandle(e) {
    setcheckBox(e.target.checked);
    if (e.target.checked) {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
  }
  async function addCategory() {
    // console.log("inj");
    // e.preventDefault();
    const result = categories.findIndex(
      (item) => category.toLowerCase() === item.category.toLowerCase()
    );
    if (result === -1) {
      if (!(category.trim() === "") && !(categoryImg.trim() === "")) {
        // console.log("-1");
        const { data } = await axios.post("/api/add/category", {
          category: { category: category, categoryImg: categoryImg },
        });
        if (data.status) {
          setCategories([
            ...categories,
            { category: category, categoryImg: categoryImg },
          ]);
          setcheckBox(false);
          setdisabled(false);
          closeMessage(messageApi, data.msg, "success");
        } else {
          closeMessage(messageApi, data.msg, "error");
        }
      } else {
        closeMessage(
          messageApi,
          "Both category name and category Img are required",
          "error"
        );
      }
    } else if (checkBox) {
      closeMessage(messageApi, "Category Already Exsists", "success");
      setcheckBox(false);
      setdisabled(false);
    }
  }
  return (
    <div className="body">
      {contextHolder}
      <Sidebar
        onClickH={handleAddH}
        onClickP={handleAddP}
        onClickIT={handleAddIT}
        onClickTI={handleAddTI}
        onClickEdit={editBlog}
      />
      <div>
        {/* {show && (
          <Alert
            style={{ zIndex: "3" }}
            className="alert1"
            variant="primary"
            onClose={() => setShow(false)}
            dismissible
          >
            <p>{status && status.msg}</p>
          </Alert>
        )} */}

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
              {!checkBox ? (
                <select
                  name="brand"
                  // onChange={(e) => setbrand(e.target.value)}
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  id="inputState"
                  className="form-select"
                  required
                >
                  <option value="">
                    Please select the category of the blog...
                  </option>
                  {categories &&
                    categories.map((category, idx) => {
                      return (
                        <option key={idx + "id"} value={category.category}>
                          {category.category}
                        </option>
                      );
                    })}
                </select>
              ) : (
                // <form id="categoryForm" onSubmit={(e) => addCategory(e)}>

                <div>
                  <input
                    style={{ marginBottom: "5px" }}
                    className="form-control"
                    // id={"p" + idx}
                    value={categoryImg}
                    onChange={(e) => setcategoryImg(e.target.value)}
                    placeholder="Please enter the URL of category image..."
                    autocomplete="off"
                    required
                  />
                  <div class="input-group">
                    <input
                      className="form-control"
                      // id={"p" + idx}
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}
                      placeholder="Please enter the category of the blog..."
                      autocomplete="off"
                      required
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      form="categoryForm"
                      // disabled={disabled}
                      class="btn btn-primary input-group-text"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
                // {/* </form> */}
              )}
              <div className="pl-4 pt-2">
                <input
                  className="form-check-input "
                  type="checkbox"
                  checked={checkBox}
                  // disabled={!details.name && true}
                  // onChange={(e) => setcheckBox(e.target.checked)}
                  onChange={(e) => checkBoxHandle(e)}
                />
                <label
                  onClick={() => {
                    setcheckBox(!checkBox);
                    setdisabled(!disabled);
                  }}
                  className="form-check-label"
                  htmlFor="defaultCheck1"
                >
                  <small>
                    Tick the checkbox if category is not in the list.{" "}
                  </small>
                </label>
              </div>
              {/* <input
                className="form-control"
                // id={"p" + idx}
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                placeholder="Please enter the category of the blog..."
                autocomplete="off"
                required
              /> */}
            </div>
            <Drawer
              title="Select the Input Type"
              height={230}
              placement="top"
              onClose={() => setopenpopover(false)}
              open={openpopover}
            >
              <p
                className="p-link "
                style={{ margin: 0 }}
                onClick={() => handleAddInBetween(tagId, "P")}
              >
                P : Paragraph Input
              </p>
              <p
                style={{ margin: 0 }}
                className="p-link"
                onClick={() => handleAddInBetween(tagId, "H")}
              >
                H : Heading Input
              </p>
              <p
                style={{ margin: 0 }}
                className="p-link"
                onClick={() => handleAddInBetween(tagId, "TI")}
              >
                TI : Text on Left and Image on Right
              </p>
              <p
                style={{ margin: 0 }}
                className="p-link"
                onClick={() => handleAddInBetween(tagId, "IT")}
              >
                IT : Image on Left and Text on Right
              </p>
            </Drawer>
            {blog.map((bl, idx) => {
              return (
                <div>
                  <div
                    // onClick={() => handleAddInBetween(idx)}
                    onClick={() => {
                      setopenpopover(true);
                      setTagId(idx);
                    }}
                    className="p-2"
                    // style={{ height: "20px", width: "100%" }}
                  ></div>
                  {/* </Popover> */}
                  <div class=" p-3 bg-light">
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
                </div>
              );
            })}
            <button
              type="submit"
              disabled={disabled}
              class="m-3 btn btn-primary"
            >
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
