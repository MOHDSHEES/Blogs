import React, { useEffect, useState } from "react";
import Autocomplete from "../autocomplete/autocomplete";
import { closeMessage } from "../functions/message";
import { message } from "antd";
import axios from "axios";
import AllBlogs from "./allBlogs";
import { useNavigate } from "react-router-dom";

const AllBlogswithFilter = ({ adminLevel, blogs }) => {
  const [radio, setRadio] = useState("1");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [writerBlog, setWriterBlog] = useState(null);
  const [filteredData, setfilteredData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [allBlogs, setAllBlogs] = useState(null);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    if (checked && !writers.length) {
      (async () => {
        const { data } = await axios.post("/api/find/writer/names");

        if (data && data.status === 200) {
          setWriters(data.data);
        }
      })();
    }
  }, [checked, writers]);
  useEffect(() => {
    setAllBlogs(blogs);
    setfilteredData(blogs);
  }, [blogs]);
  function filter(value, flag) {
    if (value === "2") {
      setLoading(true);
      if (flag && checked) {
        const d = writerBlog.filter((task) => task.status === "Inactive");
        setfilteredData(d);
      } else {
        const d = allBlogs.filter((task) => task.status === "Inactive");
        setfilteredData(d);
      }
      setLoading(false);
      // setfilteredData(d);
    } else if (value === "3") {
      setLoading(true);
      if (flag && checked) {
        // console.log("in");
        const d = writerBlog.filter((task) => task.status === "Active");
        setfilteredData(d);
      } else {
        // console.log("out");
        const d = allBlogs.filter((task) => task.status === "Active");
        setfilteredData(d);
      }
      // const d = allBlogs.filter((task) => task.status === "Active");
      setLoading(false);
      // setfilteredData(d);
    } else if (value === "4") {
      setLoading(true);

      if (flag && checked) {
        const d = writerBlog.filter(
          (task) =>
            (task.activationRequest.slice(-1) === "1" ||
              task.activationRequest === "true") &&
            task.status === "Inactive"
        );
        setfilteredData(d);
      } else {
        const d = allBlogs.filter(
          (task) =>
            (task.activationRequest.slice(-1) === "1" ||
              task.activationRequest === "true") &&
            task.status === "Inactive"
        );
        setfilteredData(d);
      }
      setLoading(false);
      // setfilteredData(d);
    } else {
      setLoading(false);
      if (checked && flag) setfilteredData(writerBlog);
      else setfilteredData(allBlogs);
    }
  }

  function onOptionChange(fl, e) {
    if (e) {
      setRadio(e.target.value);
      filter(e.target.value, fl);
    } else {
      filter("1", fl);
    }
  }

  async function WriterBlogsSearch(e, search) {
    e.preventDefault();
    const parenthesesRegex = /\(([^)]+)\)/;

    const match = search.match(parenthesesRegex);
    if (match && match.length) {
      const { data } = await axios.post("/api/find/writer/blogs", {
        email: match[1],
      });
      if (data.status === 200) {
        setWriterBlog(data.blogs);
        setRadio("1");
        setfilteredData(data.blogs);
      }
    } else {
      closeMessage(
        messageApi,
        "Something went wrong,Please try again later.",
        "error"
      );
    }
  }

  const [titles, setTitles] = useState([]);
  function toggleSwitch() {
    if (checked) {
      setRadio("1");
      onOptionChange(0);
    }
    setChecked(!checked);
  }
  const navigate = useNavigate();
  async function searchHandler(e, search) {
    e.preventDefault();
    const { data } = await axios.post("/api/find/updated/blog", {
      title: search,
    });
    if (data.length) {
      //   updateForm(data[0]);
      navigate("/edit", { state: data[0] });
    } else {
      closeMessage(messageApi, "Blog not Found", "error");
    }
  }
  async function editBlog() {
    // setFlag(1);
    // setUpdateFlag(1);
    const { data } = await axios.post("/api/blog/updated/titles");
    setTitles(data);
  }
  useEffect(() => {
    if (!titles.length) editBlog();
  }, [titles]);
  return (
    <div>
      {contextHolder}
      <Autocomplete searchHandler={searchHandler} suggestions={titles} />
      {adminLevel && adminLevel <= 3 && (
        <div className="user-blogs-switch-container">
          <div
            class="form-check form-switch user-blogs-switch "
            style={{ paddingLeft: "0px" }}
          >
            <label class="form-check-label" for="flexSwitchCheckChecked">
              Search for particular Writer:
            </label>
            <input
              class="form-check-input"
              style={{ marginLeft: "8px" }}
              type="checkbox"
              onClick={toggleSwitch}
              id="flexSwitchCheckChecked"
              checked={checked}
            />
          </div>
          <div
            className={`user-blogs-switch-input ${
              checked ? "input-expanded" : ""
            }`}
          >
            <Autocomplete
              searchHandler={WriterBlogsSearch}
              suggestions={writers}
              placeholder="Enter name of Content Writer to search the blogs"
            />
          </div>
        </div>
      )}
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
                onChange={(e) => onOptionChange(1, e)}
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
                onChange={(e) => onOptionChange(1, e)}
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
                onChange={(e) => onOptionChange(1, e)}
              />
              <label class="form-check-label" for="inlineRadio3">
                Active
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio4"
                value="4"
                checked={radio === "4"}
                onChange={(e) => onOptionChange(1, e)}
              />
              <label class="form-check-label" for="inlineRadio4">
                Activation Request's
              </label>
            </div>
          </div>
        )}
        {loading
          ? "Loading..."
          : filteredData && filteredData.length !== 0
          ? filteredData.map((bl) => {
              return (
                <AllBlogs blog={bl} adminPannel={false} fromAdmin={true} />
              );
            })
          : "No Blogs"}
        {/* // {blogs.length > 0 &&
        //   blogs.map((bl) => {
        //     return <AllBlogs blog={bl} />;
        //   })} */}
      </div>
    </div>
  );
};

export default AllBlogswithFilter;
