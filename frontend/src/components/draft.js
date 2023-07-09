import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Draft = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="cxf2qo25od9zprfi6zjjx6nxqa6xdm3c4b9h3uyq1981iunr"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
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
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | image " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",

          image_list: [
            { title: "My image 1", value: "https://www.example.com/my1.gif" },
            { title: "My image 2", value: "http://www.moxiecode.com/my2.gif" },
          ],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          //   image_class_list: [
          //     { title: "Left", value: "" },
          //     { title: "Right", value: "w-full md:float-right" },
          //   ],
          //   formats: {
          //     alignleft: {
          //       selector:
          //         "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
          //       classes: "left",
          //     },
          //     aligncenter: {
          //       selector:
          //         "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
          //       classes: "center",
          //     },
          //     alignright: {
          //       selector:
          //         "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
          //       classes: "right",
          //     },
          //     alignjustify: {
          //       selector:
          //         "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
          //       classes: "full",
          //     },
          //     bold: { inline: "span", classes: "bold" },
          //     italic: { inline: "span", classes: "italic" },
          //     underline: { inline: "span", classes: "underline", exact: true },
          //     strikethrough: { inline: "del" },
          //     forecolor: {
          //       inline: "span",
          //       classes: "forecolor",
          //       styles: { color: "%value" },
          //     },
          //     hilitecolor: {
          //       inline: "span",
          //       classes: "hilitecolor",
          //       styles: { backgroundColor: "%value" },
          //     },
          //     custom_format: {
          //       block: "h1",
          //       attributes: { title: "Header" },
          //       styles: { color: "red" },
          //     },
          //   },
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default Draft;
