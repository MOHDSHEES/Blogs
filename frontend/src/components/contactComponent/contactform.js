import React, { useState } from "react";
import axios from "axios";
import { openMessage, closeMessage } from "../functions/message";
import { message } from "antd";

const Contactform = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setdisabled] = useState(false);
  const [State, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function clearState() {
    setState({ name: "", email: "", subject: "", message: "" });
  }
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setState({
      ...State,
      [name]: value,
    });
  };

  async function submitHandler(e) {
    e.preventDefault();
    setdisabled(true);
    openMessage(messageApi, "Sending...");
    // console.log(State);
    const { data } = await axios.post("/api/contact/sendemail", {
      State,
    });
    // console.log(data);
    if (data.success) {
      setdisabled(false);
      clearState();
      closeMessage(messageApi, data.message, "success");
    } else {
      setdisabled("false");
      closeMessage(messageApi, data.message, "error");
    }
  }
  return (
    <div class="container-fluid" style={{ padding: "1rem 15px" }}>
      {contextHolder}
      <div class="container" style={{ padding: "0" }}>
        <div class="bg-light py-2 px-4 mb-3">
          <h3 class="m-0">Contact Us For Any Queries</h3>
        </div>
        <div class="row" style={{ flexWrap: "wrap-reverse" }}>
          <div class="col-md-5">
            <div class="bg-light mb-3" style={{ padding: "30px" }}>
              <h6 class="font-weight-bold">Get in touch</h6>
              <p>
                Labore ipsum ipsum rebum erat amet nonumy, nonumy erat justo sit
                dolor ipsum sed, kasd lorem sit et duo dolore justo lorem stet
                labore, diam dolor et diam dolor eos magna, at vero lorem elitr
              </p>
              <div class="d-flex align-items-center mb-3">
                <i class="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
                <div class="d-flex flex-column">
                  <h6 class="font-weight-bold">Our Office</h6>
                  <p class="m-0">123 Street, New York, USA</p>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3">
                <i class="fa fa-2x fa-envelope-open text-primary mr-3"></i>
                <div class="d-flex flex-column">
                  <h6 class="font-weight-bold">Email Us</h6>
                  <p class="m-0">info@example.com</p>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <i class="fas fa-2x fa-phone-alt text-primary mr-3"></i>
                <div class="d-flex flex-column">
                  <h6 class="font-weight-bold">Call Us</h6>
                  <p class="m-0">+012 345 6789</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="contact-form bg-light mb-3" style={{ padding: "30px" }}>
              <div id="success"></div>
              <form
                onSubmit={submitHandler}
                name="sentMessage"
                id="contactForm"
                // novalidate="novalidate"
              >
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="control-group">
                      <input
                        type="text"
                        class="form-control p-2"
                        id="name"
                        name="name"
                        value={State.name}
                        onChange={Inputchange}
                        placeholder="Your Name"
                        required="required"
                        data-validation-required-message="Please enter your name"
                      />
                      <p class="help-block text-danger"></p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="control-group">
                      <input
                        type="email"
                        class="form-control p-2"
                        id="email"
                        name="email"
                        value={State.email}
                        onChange={Inputchange}
                        placeholder="Your Email"
                        required="required"
                        data-validation-required-message="Please enter your email"
                      />
                      <p class="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div class="control-group">
                  <input
                    type="text"
                    class="form-control p-2"
                    id="subject"
                    name="subject"
                    value={State.subject}
                    onChange={Inputchange}
                    placeholder="Subject"
                    required="required"
                    data-validation-required-message="Please enter a subject"
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <textarea
                    class="form-control"
                    rows="4"
                    id="message"
                    name="message"
                    value={State.message}
                    onChange={Inputchange}
                    placeholder="Message"
                    required="required"
                    data-validation-required-message="Please enter your message"
                  ></textarea>
                  <p class="help-block text-danger"></p>
                </div>
                <div>
                  <button
                    class="btn btn-primary font-weight-semi-bold px-4"
                    // style={{ height: "50px" }}
                    disabled={disabled}
                    type="submit"
                    id="sendMessageButton"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactform;
