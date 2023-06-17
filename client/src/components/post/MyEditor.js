import React from "react";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";

export default function MyEditor(props) {


  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div className="p-2 rounded-lg"
      style={{ border: "1px solid rgb(75 85 99)", minHeight: "6em", cursor: "text" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={props.editorState}
        onChange={props.setEditorState}
        placeholder="ტექსტი"
      />
    </div>
  );
}