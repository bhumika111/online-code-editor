import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "codemirror/theme/material.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from "@fortawesome/free-solid-svg-icons";

export default function Editor(props) {
  const { language, displayName, value, onChange, open, onExpandCollapse } = props;

  // Decide the language extension for CodeMirror
  const getLanguageExtension = () => {
    if (language === "html") return html();
    if (language === "css") return css();
    if (language === "js") return javascript();
  };

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

      <CodeMirror
        value={value}
        height="300px"
        extensions={[getLanguageExtension()]}
        theme="material"
        onChange={(value) => onChange(value)}
        className={`code-mirror-wrapper ${language}-editor`}
      />
    </div>
  );
}
