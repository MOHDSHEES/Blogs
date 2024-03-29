import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { message } from "antd";
import { closeMessage, openMessage } from "../functions/message";
import AllBlogs from "../blogAdd/allBlogs";
import Autocomplete from "../autocomplete/autocomplete";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../../context";
import EditorSidebar from "./editorSidebar";
// import { TwitterTweetEmbed } from "react-twitter-embed";
// import "./styles.css";

export const TextEditor = () => {
  const [state, setState] = useState(null);
  // console.log(state);
  const [titles, setTitles] = useState([]);
  const [mainImg, setmainImg] = useState("");
  const [keywords, setkeywords] = useState("");
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [checkBox, setcheckBox] = useState(false);
  const [categoryImg, setcategoryImg] = useState("");
  const [disabledCategoryBtn, setdisabledCategoryBtn] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [id, setId] = useState(null);
  const [flag, setFlag] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(0);
  const [filteredData, setfilteredData] = useState(null);
  const [radio, setRadio] = useState("1");
  const [loading, setLoading] = useState(false);
  const { categories: cate } = useContext(globalContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setuser] = useState(null);

  function onOptionChange(e) {
    setRadio(e.target.value);
    if (e.target.value === "2") {
      setLoading(true);
      const d = allBlogs.filter((task) => task.status === "Inactive");
      setLoading(false);
      setfilteredData(d);
    } else if (e.target.value === "3") {
      setLoading(true);
      const d = allBlogs.filter((task) => task.status === "Active");
      setLoading(false);
      setfilteredData(d);
    } else {
      setLoading(false);
      setfilteredData(allBlogs);
    }
  }

  async function editBlog() {
    setFlag(1);
    setUpdateFlag(1);
    const { data } = await axios.post("/api/blog/titles");
    setTitles(data);
  }
  async function submitHandler(e) {
    e.preventDefault();
    setdisabled(true);
    if (flag) {
      let text =
        "Blog will be Inactive until verified by Admin. Are you sure to update. \n";
      if (window.confirm(text) === true) {
        openMessage(messageApi, "Saving...");
        const { data } = await axios.post("/api/update/new/blog", {
          id: id,
          mainImg,
          keywords,
          category,
          blog: state,
        });
        if (data && data.status === 1)
          closeMessage(messageApi, data.msg, "success");
        else closeMessage(messageApi, data.msg, "error");

        setAllBlogs([...allBlogs.filter((blog) => blog._id !== id), data.data]);
        if (radio === "3")
          setfilteredData([...filteredData.filter((blog) => blog._id !== id)]);
        else
          setfilteredData([
            ...filteredData.filter((blog) => blog._id !== id),
            data.data,
          ]);
      }
    } else {
      openMessage(messageApi, "Saving...");
      const { data } = await axios.post("/api/add/new/blog", {
        mainImg,
        keywords,
        category,
        blog: state,
        user: user._id,
      });
      closeMessage(messageApi, data.msg, "success");
      setAllBlogs([...allBlogs, data.data]);
      if (radio !== "3") setfilteredData([...filteredData, data.data]);
      newBlog();
    }
    setdisabled(false);
  }
  // console.log(modules);
  // console.log(state);
  const handleChange = (value) => {
    setState(value);
  };

  function reset() {
    setUpdateFlag(1);
    setState(null);
    setcategory("");
    setkeywords("");
    setmainImg("");
  }

  function newBlog() {
    reset();
    setUpdateFlag(0);
    setFlag(0);
  }

  // useEffect(() => {
  //   if (quillRef.current) {
  //     const quillInstance = quillRef.current.getEditor();
  //     quillInstance.clipboard.dangerouslyPasteHTML(initialContent);

  //     // Apply CSS styles to the inserted image
  //     const imageBlots = quillInstance.root.querySelectorAll("img");
  //     imageBlots.forEach((imageBlot) => {
  //       if (imageBlot.width === 201 && imageBlot.height === 174.0351890611087) {
  //         imageBlot.style.width = "201px";
  //         imageBlot.style.height = "174.0351890611087px";
  //         imageBlot.style.display = "inline";
  //         imageBlot.style.float = "left";
  //         imageBlot.style.margin = "0px 1em 1em 0px";
  //       }
  //     });
  //   }
  // }, []);

  // const initialContent =
  //   '<p>Some text before the image.</p><img src="https://res.cloudinary.com/domyp6djh/image/upload/v1688566567/technology%20webp/NVIDIA_GAUGAN_1640_1420_px_ywigkz_ozlgbh.webp" width="201" height="174.0351890611087" style="display: inline; float: left; margin: 0px 1em 1em 0px;" data-align="left"><p>Some text after the image.</p>';
  function updateForm(data) {
    setUpdateFlag(0);
    setId(data._id);
    // console.log(deltaContent);
    setState(data.blog);
    setcategory(data.category);
    setmainImg(data.mainImg);
    setkeywords(data.keywords);
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
  const quillRef = useRef(null);

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
  function checkBoxHandle(e) {
    setcheckBox(e.target.checked);
    if (e.target.checked) {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
  }

  const [allBlogs, setAllBlogs] = useState(null);
  // console.log(allBlogs);
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      // console.log("in");
      (async () => {
        const { data } = await axios.post("/api/find/ublog/all", {
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
        setfilteredData(data.blogs);
      })();
    }
  }, [navigate, user]);

  useEffect(() => {
    setCategories(cate);
  }, [cate]);

  return (
    <div className="body">
      {contextHolder}
      <EditorSidebar
        // onClickH={handleAddH}
        // onClickP={handleAddP}
        // onClickIT={handleAddIT}
        // onClickTI={handleAddTI}
        // onClickTW={handleAddTW}
        onClickEdit={editBlog}
        isAdmin={true}
      />
      {flag ? (
        <div style={{ marginTop: "80px" }}>
          {isAdmin && (
            <Autocomplete searchHandler={searchHandler} suggestions={titles} />
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
              {allBlogs && allBlogs.length !== 0 && (
                <div className="m-3">
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
                      Inactive
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
                      Active
                    </label>
                  </div>
                </div>
              )}
              {/* <MoreCategories blog={allBlogs} /> */}
              {loading ? (
                "Loading..."
              ) : (
                <div class="row">
                  {filteredData && filteredData.length !== 0
                    ? filteredData.map((blog, idx) => {
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
                      })
                    : "No blogs"}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      {!updateFlag ? (
        <div className="text-editor">
          <form onSubmit={submitHandler}>
            <div class="p-3 bg-light">
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
            <div>
              <EditorToolbar quillRef={quillRef} state={state} />
              {/* <button onClick={insertTweet}>Embed Tweet</button> */}
              <ReactQuill
                ref={quillRef}
                style={{ height: "80vh", background: "white" }}
                theme="snow"
                value={state}
                onChange={handleChange}
                placeholder={"Start writing blog..."}
                modules={modules}
                formats={formats}
              />
              {/* <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: state }}
              /> */}
            </div>
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
                  {/* <button
                    onClick={(e) => deleteBlog(e)}
                    type="button"
                    class="m-3 btn btn-danger"
                  >
                    Delete
                  </button> */}
                </>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextEditor;
