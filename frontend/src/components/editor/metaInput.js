import React, { useContext, useEffect } from "react";
// import axios from "axios";
import { useState } from "react";
import { message } from "antd";
// import { closeMessage, openMessage } from "../functions/message";
import { globalContext } from "../../context";

const MetaInput = ({ setMetaData, metaData }) => {
  useEffect(() => {
    setcategory(metaData.category);
    setTitle(metaData.title);
    setkeywords(metaData.keywords);
    setmainImg(metaData.mainImg);
    setDescription(metaData.description);
    setRelated(metaData.related ? metaData.related : "");
  }, [metaData]);
  //   console.log(metaData);
  const [keywords, setkeywords] = useState(metaData.keywords);
  const [mainImg, setmainImg] = useState(metaData.mainImg);
  const [title, setTitle] = useState(metaData.title);
  const [category, setcategory] = useState(metaData.category);
  const [categories, setCategories] = useState(null);
  const [related, setRelated] = useState(
    metaData.related ? metaData.related : ""
  );
  // const [checkBox, setcheckBox] = useState(false);
  // const [categoryImg, setcategoryImg] = useState("");
  // const [disabledCategoryBtn, setdisabledCategoryBtn] = useState(false);
  // const [disabled, setdisabled] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();
  const { categories: cate } = useContext(globalContext);
  //   const [id, setId] = useState(null);
  const [description, setDescription] = useState(metaData.description);

  // async function addCategory() {
  //   const result = categories.findIndex(
  //     (item) => category.toLowerCase() === item.category.toLowerCase()
  //   );
  //   if (result === -1) {
  //     if (!(category.trim() === "") && !(categoryImg.trim() === "")) {
  //       setdisabledCategoryBtn(true);
  //       openMessage(messageApi, "Adding Category...");
  //       const { data } = await axios.post("/api/add/category", {
  //         category: { category: category, categoryImg: categoryImg },
  //       });
  //       if (data.status) {
  //         setCategories([
  //           ...categories,
  //           { category: category, categoryImg: categoryImg },
  //         ]);
  //         setcheckBox(false);
  //         setdisabledCategoryBtn(false);
  //         setdisabled(false);
  //         closeMessage(messageApi, data.msg, "success");
  //       } else {
  //         closeMessage(messageApi, data.msg, "error");
  //         setdisabledCategoryBtn(false);
  //         setdisabled(false);
  //       }
  //     } else {
  //       closeMessage(
  //         messageApi,
  //         "Both category name and category Img are required",
  //         "error"
  //       );
  //     }
  //   } else if (checkBox) {
  //     closeMessage(messageApi, "Category Already Exsists", "success");
  //     setcheckBox(false);
  //     setdisabled(false);
  //   }
  // }
  // function checkBoxHandle(e) {
  //   setcheckBox(e.target.checked);
  //   if (e.target.checked) {
  //     setdisabled(true);
  //   } else {
  //     setdisabled(false);
  //   }
  // }

  useEffect(() => {
    setCategories(cate);
  }, [cate]);

  async function submitHandler(e) {
    e.preventDefault();
    setMetaData({
      title: title.trim(),
      mainImg: mainImg,
      category: category,
      keywords: keywords,
      description: description.trim(),
      related: related,

      //   id: id,
    });
    window.$("#staticBackdrop").modal("hide");
  }

  function clear() {
    setcategory(metaData.category);
    setTitle(metaData.title);
    setkeywords(metaData.keywords);
    setmainImg(metaData.mainImg);
    setDescription(metaData.description);
    setRelated(metaData.related ? metaData.related : "");
    // setId(null);
    window.$("#staticBackdrop").modal("hide");
  }
  return (
    <div
      class="modal fade"
      style={{ zIndex: 1000 }}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      {/* {contextHolder} */}
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="staticBackdropLabel">
              Meta Data
            </h2>
            <button
              type="button"
              class="btn-close"
              onClick={clear}
              //   data-bs-dismiss="modal"
              //   aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form onSubmit={submitHandler}>
              <div class="p-3 bg-light">
                {/* <small>
                  <b>Note: </b> If updating previous blogs from older editor.
                  Please provide the id of that blog. i.e- last 24 digits of
                  url.{" "}
                </small> */}
                {/* <div style={{ margin: "10px 0 5px" }}>
                  <small>Blog Id (Optional)</small>
                </div>
                <input
                  className="form-control"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Please enter the blog Id ..."
                  autocomplete="off"
                /> */}
                <div style={{ margin: "10px 0 5px" }}>
                  <small>Title</small>
                </div>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please enter the title..."
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
                  <small>Description</small>
                </div>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please enter description i.e Introduction..."
                  autocomplete="off"
                  required
                />
                <div style={{ margin: "10px 0 5px" }}>
                  <small>Category</small>
                </div>

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
                <div style={{ margin: "10px 0 5px" }}>
                  <small>Related Blogs (Optional)</small>
                </div>
                <input
                  className="form-control"
                  value={related}
                  onChange={(e) => setRelated(e.target.value)}
                  placeholder="Please enter Id's of related blogs seperated by comma"
                  autocomplete="off"
                />
                {/* : (
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
                  ) */}

                {/* <div className="pl-4 pt-2">
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
                </div> */}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={clear}
                  //   data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  // disabled={disabled}
                  type="submit"
                  class="btn btn-primary"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaInput;
