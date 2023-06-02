import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AllBlogs from "../blogAdd/allBlogs";
import { message } from "antd";
import { closeMessage } from "../functions/message";
import { useNavigate } from "react-router-dom";

const PendingTable = () => {
  const [blog, setBlog] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/find/blog/status", {
        status: "Inactive",
      });
      setBlog(data);
    })();
  }, []);
  const navigate = useNavigate();
  function preview(data) {
    navigate("/blog/" + data._id + "/" + data.title, {
      state: { ...data, isAdmin: true },
    });
  }

  async function statusHandler(id, status) {
    const { data } = await axios.post("/api/update/blog/status", {
      id: [id],
      status: status,
    });
    if (data && data.status === 200) {
      closeMessage(messageApi, data.msg, "success");
      setBlog(blog.filter((blog) => blog._id !== id));
    } else {
      closeMessage(messageApi, data.msg, "error");
    }
  }
  return (
    <div class="table-responsive">
      {contextHolder}
      {blog && blog.length > 0 ? (
        <table class="table ">
          <thead>
            <tr class="table-info">
              <th scope="col">No.</th>
              <th scope="col">Blog</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((bl, idx) => {
              return (
                <tr>
                  <th scope="row">{idx + 1}</th>{" "}
                  <td onClick={() => preview(bl)} style={{ cursor: "pointer" }}>
                    <AllBlogs key={bl._id} blog={bl} />
                  </td>
                  <td>
                    <button
                      onClick={() => statusHandler(bl._id, "Active")}
                      type="button"
                      class="btn btn-primary"
                    >
                      Activate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div class="alert alert-primary" role="alert">
          No Blogs for activation.
        </div>
      )}
    </div>
  );
};

export default PendingTable;
