import React, { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { closeMessage, openMessage } from "./functions/message";
import axios from "axios";
import { globalContext } from "../context";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Autocomplete from "./autocomplete/autocomplete";
import AllBlogs from "./blogAdd/allBlogs";
import EditorSidebar from "./editor/editorSidebar";

const Draft = () => {
  const editorRef = useRef(null);

  //   useEffect(() => {
  //     window.$("#staticBackdrop").modal("show"); // Show the modal on page render
  //   }, []);
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };

  const [state, setState] = useState(null);
  const [metaData, setMetaData] = useState({
    title: "",
    mainImg: "",
    keywords: "",
    category: "",
    description: "",
    // id: null,
  });
  const [titles, setTitles] = useState([]);
  //   const [mainImg, setmainImg] = useState("");
  //   const [keywords, setkeywords] = useState("");
  //   const [category, setcategory] = useState("");
  //   const [categories, setCategories] = useState(null);
  //   const [checkBox, setcheckBox] = useState(false);
  //   const [categoryImg, setcategoryImg] = useState("");
  //   const [disabledCategoryBtn, setdisabledCategoryBtn] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [id, setId] = useState(null);
  const [flag, setFlag] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(0);
  const [filteredData, setfilteredData] = useState(null);
  const [radio, setRadio] = useState("1");
  const [loading, setLoading] = useState(false);
  //   const { categories: cate } = useContext(globalContext);
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
    const { data } = await axios.post("/api/blog/updated/titles");
    setTitles(data);
  }
  async function submitHandler(e) {
    e.preventDefault();

    if (metaData.title.trim()) {
      if (state && state.trim()) {
        setdisabled(true);
        if (flag) {
          let text =
            "Blog will be Inactive until verified by Admin. Are you sure to update. \n";
          if (window.confirm(text) === true) {
            openMessage(messageApi, "Saving...");
            const { data } = await axios.post("/api/update/new/blog", {
              id: id,
              metaData: metaData,
              blog: state,
            });
            if (data && data.status === 1)
              closeMessage(messageApi, data.msg, "success");
            else closeMessage(messageApi, data.msg, "error");

            setAllBlogs([
              ...allBlogs.filter((blog) => blog.id !== id),
              data.data,
            ]);
            if (radio === "3")
              setfilteredData([
                ...filteredData.filter((blog) => blog.id !== id),
              ]);
            else
              setfilteredData([
                ...filteredData.filter((blog) => blog.id !== id),
                data.data,
              ]);
          }
        } else {
          openMessage(messageApi, "Saving...");
          const { data } = await axios.post("/api/add/new/blog", {
            metaData: metaData,
            blog: state,
            user: user._id,
          });
          closeMessage(messageApi, data.msg, "success");
          setAllBlogs([...allBlogs, data.data]);

          if (radio !== "3") setfilteredData([...filteredData, data.data]);
          reset();
          setUpdateFlag(0);
          setFlag(0);
        }
        setdisabled(false);
      } else {
        closeMessage(messageApi, "All fields are required", "error");
      }
    } else {
      closeMessage(messageApi, "All fields are required", "error");
      window.$("#staticBackdrop").modal("show");
    }
  }
  // console.log(modules);
  // console.log(state);
  //   const handleChange = (value) => {
  //     setState(value);
  //   };

  function reset() {
    setUpdateFlag(1);
    setState(null);
    setMetaData({
      category: "",
      mainImg: "",
      title: "",
      keywords: "",
      description: "",
      //   id: null,
    });
  }

  function newBlog() {
    reset();
    setUpdateFlag(0);
    setFlag(0);
    window.$("#staticBackdrop").modal("show");
  }

  function updateForm(data) {
    setUpdateFlag(0);
    setId(data.id);
    // console.log(deltaContent);
    setState(data.blog);
    setMetaData({
      category: data.category,
      mainImg: data.mainImg,
      title: data.title,
      keywords: data.keywords,
      description: data.description,
    });
    window.$("#staticBackdrop").modal("show");
  }

  async function searchHandler(e, search) {
    e.preventDefault();
    const { data } = await axios.post("/api/find/updated/blog", {
      title: search,
    });
    if (data.length) {
      updateForm(data[0]);
    } else {
      closeMessage(messageApi, "Blog not Found", "error");
      reset();
    }
  }

  //

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
          window.$("#staticBackdrop").modal("hide");
          navigate("/login", { replace: true });
        } else {
          setuser(data.user);
          window.$("#staticBackdrop").modal("show");
          setIsAdmin(data.user.isAdmin);
          setAllBlogs(data.blogs);
          setfilteredData(data.blogs);
        }
      })();
    }
  }, [navigate, user]);

  return (
    <div className="body">
      {contextHolder}
      <EditorSidebar
        setMetaData={setMetaData}
        metaData={metaData}
        updateFlag={updateFlag}
        onClickEdit={editBlog}
        isAdmin={isAdmin}
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
        <div className="text-editor" style={{ marginTop: "80px" }}>
          <form onSubmit={submitHandler}>
            <Editor
              apiKey="cxf2qo25od9zprfi6zjjx6nxqa6xdm3c4b9h3uyq1981iunr"
              onInit={(evt, editor) => (editorRef.current = editor)}
              //   initialValue="Start writing..."
              value={state}
              onEditorChange={(content) => setState(content)}
              init={{
                height: 500,
                placeholder: "Start writing here...",
                menubar: true,
                statusbar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks| fontfamily | fontsizeinput | image " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent |" +
                  "removeformat ",
                font_size_formats:
                  "8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 36pt 48pt 72pt",

                image_list: [
                  {
                    title: "Sample Img",
                    value:
                      "https://res.cloudinary.com/domyp6djh/image/upload/v1685970572/468x200_af2w60.png",
                  },
                  //   {
                  //     title: "My image 2",
                  //     value: "http://www.moxiecode.com/my2.gif",
                  //   },
                ],
                content_style:
                  "body { font-family:Times new roman,Arial,sans-serif;font-size:18px  }",
              }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
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

export default Draft;
