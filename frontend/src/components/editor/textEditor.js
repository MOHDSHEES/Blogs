import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
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

  return (
    <div className="text-editor">
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
  );
};

export default TextEditor;
