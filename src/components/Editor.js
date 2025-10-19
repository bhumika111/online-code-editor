import React from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml"; // for HTML
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from "@fortawesome/free-solid-svg-icons";

export default function Editor(props) {
  const { language, displayName, value, onChange, open, onExpandCollapse } = props;

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        <FontAwesomeIcon
          icon={language === "html" ? ["fab", "html5"] : language === "css" ? ["fab", "css3-alt"] : ["fab", "js"]}
          className="icon"
        />
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          title={open ? `Collapse ${displayName} editor` : `Expand ${displayName} editor`}
          onClick={onExpandCollapse}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={(editor, data, value) => onChange(value)}
        value={value}
        className={`code-mirror-wrapper ${language}-editor`}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language === "html" ? "xml" : language === "js" ? "javascript" : language,
          theme: "material",
          lineNumbers: true
        }}
      />
    </div>
  );
}
