import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../blogAdd/sidebar";
import axios from "axios";
import { message } from "antd";
import { closeMessage, openMessage } from "../functions/message";
// import { TwitterTweetEmbed } from "react-twitter-embed";
// import "./styles.css";

export const TextEditor = () => {
  const [state, setState] = useState();

  // console.log(modules);
  // console.log(state);
  const handleChange = (value) => {
    setState(value);
  };

  const quillRef = useRef(null);

  const [mainImg, setmainImg] = useState("");
  const [keywords, setkeywords] = useState("");
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [checkBox, setcheckBox] = useState(false);
  const [categoryImg, setcategoryImg] = useState("");
  const [disabledCategoryBtn, setdisabledCategoryBtn] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
  return (
    <div className="body">
      {contextHolder}
      <Sidebar
        // onClickH={handleAddH}
        // onClickP={handleAddP}
        // onClickIT={handleAddIT}
        // onClickTI={handleAddTI}
        // onClickTW={handleAddTW}
        // onClickEdit={editBlog}
        isAdmin={true}
      />

      <div className="text-editor">
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
              // onChange={(e) => checkBoxHandle(e)}
            />
            <label
              onClick={() => {
                setcheckBox(!checkBox);
                setdisabled(!disabled);
              }}
              className="form-check-label"
              htmlFor="defaultCheck1"
            >
              <small>Tick the checkbox if category is not in the list. </small>
            </label>
          </div>
        </div>
        <div style={{ height: "500px" }}>
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
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
