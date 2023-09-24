import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AllBlogs from "../blogAdd/allBlogs";
import { message } from "antd";
import { closeMessage } from "../functions/message";
import { useNavigate } from "react-router-dom";

const PendingTable = ({ adminName }) => {
  const [blog, setBlog] = useState([]);
  const [disable, setDisable] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      // console.log("in");
      const { data } = await axios.post("/api/find/ublog/status", {
        status: "Inactive",
      });
      setLoading(false);
      setBlog(data);
    })();
  }, []);
  const navigate = useNavigate();
  // function preview(data) {
  //   navigate("/blog/" + data._id + "/" + data.title.replace(/ /g, "-"), {
  //     state: { ...data, isAdmin: true },
  //   });
  // }

  async function statusHandler(id, status, bl) {
    bl["status"] = status;
    setDisable(true);
    const { data } = await axios.post("/api/update/ublog/status", {
      id: [id],
      status: status,
      token: localStorage.getItem("employeeToken"),
      blog: bl,
      adminName: adminName,
    });
    if (data && data.status === 200) {
      closeMessage(messageApi, data.msg, "success");
      setBlog(blog.filter((bl) => bl.id !== id));
    } else if (data && data.status === 404) {
      closeMessage(messageApi, data.msg, "error");
      navigate("/");
    } else {
      closeMessage(messageApi, data.msg, "error");
    }
    setDisable(false);
  }
  return (
    <div class="table-responsive">
      {contextHolder}
      {loading ? (
        "Loading..."
      ) : blog && blog.length > 0 ? (
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
                  <td style={{ cursor: "pointer" }}>
                    <AllBlogs key={bl._id} blog={bl} adminPannel={true} />
                  </td>
                  <td>
                    <button
                      disabled={disable}
                      onClick={() => statusHandler(bl.id, "Active", bl)}
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
