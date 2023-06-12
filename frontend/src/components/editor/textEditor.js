import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
// import "./styles.css";

export const TextEditor = () => {
  const [state, setState] = useState({
    value: null,
  });

  // console.log(modules);
  // console.log(state);
  const handleChange = (value) => {
    setState({ value });
  };

  return (
    <div className="text-editor">
      <EditorToolbar state={state} />
      <ReactQuill
        style={{ height: "80vh", background: "white" }}
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Start writing blog..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
