import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { closeMessage, openMessage } from "../functions/message";
import { useContext } from "react";
import { globalContext } from "../../context";
import { useEffect } from "react";

const PhotoUpload = (props) => {
  const { messageApi } = useContext(globalContext);
  //   const [sign, setsign] = useState("");
  const [uploading, setuploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [img, setImg] = useState("");
  const [prevImg, setprevImg] = useState(props.data.profileImg);

  useEffect(() => {
    if (props.data.profileImg) {
      setprevImg(props.data.profileImg);
    }
  }, [props]);
  const onChangePicture = async (e) => {
    if (e.target.files[0]) {
      setImgData(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };
  //   console.log(prevImg);
  async function submitHandler(e) {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("image", img);

    try {
      setuploading(true);
      openMessage(messageApi, "Uploading please wait...");
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data) {
        if (prevImg) {
          const { d } = await axios.post("/api/uploads/delete", {
            imgId: prevImg,
            data: { ...props.data, profileImg: data },
            token: localStorage.getItem("employeeToken"),
          });
        } else {
          // console.log("in");
          const { data: da } = await axios.post("/api/update/employee", {
            data: { ...props.data, profileImg: data },
            token: localStorage.getItem("employeeToken"),
          });
        }
        closeMessage(
          messageApi,
          "Profile Image updated successfully",
          "success"
        );
        props.upDatedData({ ...props.data, profileImg: data });
        props.onHide();
      } else {
        props.onHide();
        closeMessage(
          messageApi,
          "Something went wrong, try again later.",
          "error"
        );
      }
      //   setsign(data);
      //   console.log(data);

      //   setdetails({ ...details, signature: data });
      setuploading(false);
    } catch (error) {
      closeMessage(messageApi, error, "error");
      props.onHide();
      //   console.log(error);
      setuploading(false);
    }
  }

  return (
    <div>
      <Modal
        // onExit={() => {
        //   clear();
        // }}
        backdrop="static"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload/Change Profile Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            {imgData && (
              <img
                src={imgData}
                className="rounded-circle img-fluid"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            )}
          </div>
          <form onSubmit={submitHandler}>
            <div class="mb-3">
              <label class="form-label" for="customFile">
                Please choose Image to upload
              </label>
              <input
                type="file"
                onChange={onChangePicture}
                class="form-control"
                id="customFile"
              />
            </div>
            <div>
              <button
                disabled={uploading}
                type="submit"
                class="btn btn-primary"
              >
                Upload
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoUpload;
