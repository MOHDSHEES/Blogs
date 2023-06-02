import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";
import Autocomplete from "../autocomplete/autocomplete";
// import Alert from "react-bootstrap/Alert";
import { openMessage, closeMessage } from "../functions/message";
import { message, Drawer } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AllBlogs from "./allBlogs";

const Form = ({ cate }) => {
  const [disabled, setdisabled] = useState(false);
  const [titles, setTitles] = useState([]);
  const [id, setId] = useState(null);
  const [flag, setFlag] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(0);
  const [blog, setblog] = useState([{ tag: "P" }]);
  const [title, settitle] = useState("");
  const [mainImg, setmainImg] = useState("");
  const [keywords, setkeywords] = useState("");
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [checkBox, setcheckBox] = useState(false);
  const [categoryImg, setcategoryImg] = useState("");
  const [openpopover, setopenpopover] = useState(false);
  const [disabledCategoryBtn, setdisabledCategoryBtn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setuser] = useState(null);

  const [tagId, setTagId] = useState(null);
  function reset() {
    setUpdateFlag(1);
    setblog([{ tag: "P" }]);
    setcategory("");
    setkeywords("");
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

  const [allBlogs, setAllBlogs] = useState(null);
  // console.log(allBlogs);
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/find/blog/all", {
        token: localStorage.getItem("token"),
      });
      if (data && data.status === 404) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
      // console.log(data);
      setuser(data.user);
      setIsAdmin(data.user.isAdmin);
      setAllBlogs(data.blogs);
    })();
  }, [navigate]);

  useEffect(() => {
    setCategories(cate);
  }, [cate]);
  async function editBlog() {
    setFlag(1);
    setUpdateFlag(1);
    const { data } = await axios.post("/api/blog/titles");
    setTitles(data);
  }
  const [originalBlog, setOriginalBlog] = useState(null);
  function updateForm(data) {
    setId(data._id);
    setblog(data.blog);
    setcategory(data.category);
    setmainImg(data.mainImg);
    setkeywords(data.keywords);
    settitle(data.title);
    setUpdateFlag(0);
    setOriginalBlog(data);
  }
  async function searchHandler(e, search) {
    e.preventDefault();
    const { data } = await axios.post("/api/find/blog", {
      title: search,
    });
    if (data.length) {
      updateForm(data[0]);
      // setId(data[0]._id);
      // setblog(data[0].blog);
      // setcategory(data[0].category);
      // setmainImg(data[0].mainImg);
      // setkeywords(data[0].keywords);
      // settitle(data[0].title);
      // setUpdateFlag(0);
    } else {
      closeMessage(messageApi, "Blog not Found", "error");
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
  function handleAddTW() {
    const values = [...blog];
    values.push({ tag: "TW" });
    setblog(values);
  }
  function handleRemove(i) {
    const values = [...blog];
    values.splice(i, 1);
    setblog(values);
  }

  function handleAddInBetween(i, tag) {
    const values = [...blog];
    values.splice(i, 0, { tag: tag });
    setblog(values);
    setopenpopover(false);
  }
  async function deleteBlog(e) {
    e.preventDefault();
    let text = "Are you sure you want to delete this blog.\n";
    if (window.confirm(text) === true) {
      openMessage(messageApi, "Deleting...");
      const { data } = await axios.post("/api/delete/blog", {
        id: id,
        user: user._id,
      });
      if (data.status) {
        closeMessage(messageApi, data.msg, "success");
        setAllBlogs(allBlogs.filter((blog) => blog._id !== id));
        newBlog();
      } else {
        closeMessage(messageApi, data.msg, "error");
      }
    }
  }
  async function saveBlog(e) {
    e.preventDefault();

    setdisabled(true);
    if (flag) {
      let text =
        "Blog will be Inactive until verified by Admin. Are you sure to update. \n";
      if (window.confirm(text) === true) {
        openMessage(messageApi, "Saving...");
        const { data } = await axios.post("/api/update/blog", {
          id: id,
          title: title.trim(),
          mainImg,
          keywords,
          category,
          blog,
        });
        if (data && data.status === 1)
          closeMessage(messageApi, data.msg, "success");
        else closeMessage(messageApi, data.msg, "error");

        setAllBlogs([...allBlogs.filter((blog) => blog._id !== id), data.data]);
      }
    } else {
      openMessage(messageApi, "Saving...");
      const { data } = await axios.post("/api/add/blog", {
        title: title.trim(),
        mainImg,
        keywords,
        category,
        blog,
        user: user._id,
      });
      closeMessage(messageApi, data.msg, "success");
      setAllBlogs([...allBlogs, data.data]);
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
    const result = categories.findIndex(
      (item) => category.toLowerCase() === item.category.toLowerCase()
    );
    if (result === -1) {
      if (!(category.trim() === "") && !(categoryImg.trim() === "")) {
        setdisabledCategoryBtn(true);
        openMessage(messageApi, "Adding Category...");
        const { data } = await axios.post("/api/add/category", {
          category: { category: category, categoryImg: categoryImg },
        });
        if (data.status) {
          setCategories([
            ...categories,
            { category: category, categoryImg: categoryImg },
          ]);
          setcheckBox(false);
          setdisabledCategoryBtn(false);
          setdisabled(false);
          closeMessage(messageApi, data.msg, "success");
        } else {
          closeMessage(messageApi, data.msg, "error");
          setdisabledCategoryBtn(false);
          setdisabled(false);
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
  function handleDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(blog);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setblog(items);
  }

  return (
    <div className="body">
      {contextHolder}
      <Sidebar
        onClickH={handleAddH}
        onClickP={handleAddP}
        onClickIT={handleAddIT}
        onClickTI={handleAddTI}
        onClickTW={handleAddTW}
        onClickEdit={editBlog}
        isAdmin={isAdmin}
      />
      <div>
        {flag ? (
          <div style={{ marginTop: "80px" }}>
            {isAdmin && (
              <Autocomplete
                searchHandler={searchHandler}
                suggestions={titles}
              />
            )}
            <a
              onClick={newBlog}
              href="#!"
              className="ms-2"
              style={{ marginRight: "10px" }}
            >
              Write a new Blog?
            </a>
            {updateFlag === 1 && (
              <div className="mt-4 p-2">
                {/* <MoreCategories blog={allBlogs} /> */}
                <div class="row">
                  {allBlogs &&
                    allBlogs.map((blog, idx) => {
                      return (
                        <div
                          onClick={(e) => updateForm(blog)}
                          class="col-lg-6"
                          style={{ cursor: "pointer" }}
                          key={idx + "Allblogs"}
                        >
                          <AllBlogs blog={blog} />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
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
                value={mainImg}
                onChange={(e) => setmainImg(e.target.value)}
                placeholder="Please enter the URL of main image..."
                autocomplete="off"
                required
              />
              <div style={{ margin: "10px 0 5px" }}>
                <small>Keywords</small>
              </div>
              <input
                className="form-control"
                value={keywords}
                onChange={(e) => setkeywords(e.target.value)}
                placeholder="Please enter keywords seperated by comma"
                autocomplete="off"
                required
              />
              <div style={{ margin: "10px 0 5px" }}>
                <small>Category</small>
              </div>
              {!checkBox ? (
                <select
                  name="brand"
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
                <div>
                  <div style={{ margin: "10px 0 5px" }}>
                    <small>Enter Image URL</small>
                  </div>
                  <input
                    style={{ marginBottom: "5px" }}
                    className="form-control"
                    value={categoryImg}
                    onChange={(e) => setcategoryImg(e.target.value)}
                    placeholder="Please enter the URL of category image..."
                    autocomplete="off"
                    required
                  />
                  <div style={{ margin: "10px 0 5px" }}>
                    <small>Enter Category</small>
                  </div>
                  <div class="input-group">
                    <input
                      className="form-control"
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
                      disabled={disabledCategoryBtn}
                      class="btn btn-primary input-group-text"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              )}
              <div className="pl-4 pt-2">
                <input
                  className="form-check-input "
                  type="checkbox"
                  checked={checkBox}
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
            </div>
            <Drawer
              title="Select the Input Type"
              height={250}
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
              <p
                style={{ margin: 0 }}
                className="p-link"
                onClick={() => handleAddInBetween(tagId, "TW")}
              >
                TW : Twitter Tweet Input
              </p>
            </Drawer>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {blog.map((bl, idx) => {
                      return (
                        <Draggable
                          key={idx}
                          draggableId={bl.tag + idx}
                          index={idx}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                onClick={() => {
                                  setopenpopover(true);
                                  setTagId(idx);
                                }}
                                className="p-2"
                              ></div>
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
                                      <small>
                                        Image on Left and Text on Right
                                      </small>
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
                                        onChange={(e) =>
                                          handleChange(idx, e, true)
                                        }
                                        placeholder="Please enter the URL of image..."
                                        autocomplete="off"
                                        required
                                      />
                                    </div>
                                  </div>
                                ) : bl.tag === "TI" ? (
                                  <div class="form-group my-2">
                                    <div style={{ marginBottom: "5px" }}>
                                      <small>
                                        Text on Left and Image on Right
                                      </small>
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
                                        onChange={(e) =>
                                          handleChange(idx, e, true)
                                        }
                                        placeholder="Please enter the URL of image..."
                                        autocomplete="off"
                                        required
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div class=" my-2">
                                    <div style={{ marginBottom: "5px" }}>
                                      <small>Tweet Input</small>
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
                                      id={"tw" + idx}
                                      value={bl.text || ""}
                                      onChange={(e) => handleChange(idx, e)}
                                      placeholder="Please enter the Id of the Tweet..."
                                      autocomplete="off"
                                      required
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="form-fixed-btn">
              <button
                type="submit"
                disabled={disabled}
                class="m-3 btn btn-primary"
              >
                {flag ? "Update" : "Save"}
              </button>
              {flag ? (
                <>
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
                </>
              ) : (
                ""
              )}
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Form;
