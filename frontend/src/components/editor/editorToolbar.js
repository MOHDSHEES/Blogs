import React, { useState } from "react";
import { Quill } from "react-quill";
// import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";
import BlotFormatter from "quill-blot-formatter";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Skeleton from "react-loading-skeleton";
// var Size = Quill.import('attributors/style/size');

Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/imageDrop", ImageDrop);

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const fontSizeArr = [
  "10px",
  "12px",
  "16px",
  "18px",
  "20px",
  "22px",
  "25px",
  "30px",
  "40px",
  "50px",
];
const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Quill.register("modules/imageResize", ImageResize);
function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt("please copy paste the image url here.");
  if (value) {
    this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
  }
}

// function handleSizeToolbar() {
//   const sizeSelector = document.querySelector(".ql-size .ql-picker");
//   if (sizeSelector) {
//     sizeSelector.innerHTML = "";
//     const customSizeSelector = new TextEditor().SizeSelector;
//     sizeSelector.appendChild(customSizeSelector());
//   }
// }
// Modules object for setting up the Quill editor
export const modules = {
  blotFormatter: {},
  imageDrop: true,
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      image: imageHandler,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// const handleSizeChange = (event) => {
//     const size = event.target.value;

//     const editor = quillRef.current.getEditor();
//     editor.format("size", size);
//   };
// Quill Toolbar component
export function QuillToolbar({ state, quillRef }) {
  //   console.log(state);
  async function submitHandler() {
    console.log(state);
  }
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <span class="ql-formats">
          <select className="ql-size" defaultValue="16px">
            <option value="10px">10</option>
            <option value="12px">12</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="20px">20</option>
            <option value="22px">22</option>
            <option value="25px">25</option>
            <option value="30px">30</option>
            <option value="40px">40</option>
            <option value="50px">50</option>
          </select>
        </span>
        <select className="ql-header" defaultValue="3"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
        <button className="ql-direction" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </span>
      <span className="ql-formats">
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
        {/* <button className="ql-tweet">Tweet</button> */}
        <button onClick={submitHandler} className="ql-save">
          <i class="bx bxs-save"></i>
        </button>
      </span>
    </div>
  );
}

export default QuillToolbar;
